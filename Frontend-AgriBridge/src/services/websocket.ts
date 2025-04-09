import { io, Socket } from 'socket.io-client';
import { store } from '../store';
import { setConnectionStatus } from '../store/slices/websocketSlice';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    console.log('WebSocket service initialized with URL:', this.baseUrl);
  }

  connect() {
    if (this.socket?.connected) {
      console.log('WebSocket already connected');
      return;
    }

    // Clean up any existing socket
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }

    console.log('Attempting to connect to WebSocket server...');
    
    // Connect to the root namespace
    this.socket = io(this.baseUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      autoConnect: true,
      forceNew: true,
      path: '/socket.io',
      upgrade: true,
      rememberUpgrade: true,
      rejectUnauthorized: false,
      withCredentials: true,
      extraHeaders: {
        'Content-Type': 'application/json'
      },
      // Add session handling
      query: {
        timestamp: Date.now()
      }
    });

    // Connection events
    this.socket.on('connect', () => {
      console.log('WebSocket connected successfully');
      this.reconnectAttempts = 0;
      store.dispatch(setConnectionStatus('connected'));
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
    });

    this.socket.on('connected', (data) => {
      console.log('Server connection confirmed:', data);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      store.dispatch(setConnectionStatus('error'));
      this.handleReconnect();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      store.dispatch(setConnectionStatus('disconnected'));
      if (reason === 'io server disconnect') {
        console.log('Server initiated disconnect, attempting to reconnect...');
        this.socket?.connect();
      } else {
        this.handleReconnect();
      }
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      store.dispatch(setConnectionStatus('error'));
      this.handleReconnect();
    });

    this.socket.on('authenticated', (data) => {
      if (data.success) {
        console.log('Authentication successful');
      } else {
        console.error('Authentication failed:', data.error);
      }
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }

      this.reconnectTimeout = setTimeout(() => {
        if (this.socket) {
          console.log('Initiating reconnection...');
          this.socket.connect();
        }
      }, Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000));
    } else {
      console.error('Max reconnection attempts reached');
      store.dispatch(setConnectionStatus('error'));
    }
  }

  disconnect() {
    if (this.socket) {
      console.log('Disconnecting WebSocket...');
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    this.reconnectAttempts = 0;
    store.dispatch(setConnectionStatus('disconnected'));
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const webSocketService = new WebSocketService(); 