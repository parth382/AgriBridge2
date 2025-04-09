import { Server, Socket } from 'socket.io';

export const setupWebSocketHandlers = (io: Server) => {
  // Handle root namespace connections
  io.on('connection', (socket: Socket) => {
    console.log('Client connected to root namespace:', socket.id);
    console.log('Client namespace:', socket.nsp.name);
    console.log('Client query params:', socket.handshake.query);

    // Send initial connection success
    socket.emit('connected', { 
      success: true, 
      socketId: socket.id,
      namespace: socket.nsp.name
    });

    // Handle client disconnection
    socket.on('disconnect', (reason) => {
      console.log('Client disconnected:', socket.id, 'Reason:', reason);
    });

    // Handle socket errors
    socket.on('error', (error) => {
      console.error('Socket error:', error);
      socket.emit('error', { message: 'Socket error occurred' });
    });

    // Handle client messages
    socket.on('message', (data) => {
      try {
        console.log('Received message:', data);
        // Broadcast to all clients in the same namespace
        socket.nsp.emit('message', data);
      } catch (error) {
        console.error('Error handling message:', error);
        socket.emit('error', { message: 'Error processing message' });
      }
    });

    // Handle authentication
    socket.on('authenticate', (token: string) => {
      try {
        // TODO: Implement token verification
        console.log('Client authenticated:', socket.id);
        socket.emit('authenticated', { success: true });
      } catch (error) {
        console.error('Authentication error:', error);
        socket.emit('authenticated', { success: false, error: 'Authentication failed' });
      }
    });

    // Handle ping/pong
    socket.on('ping', () => {
      socket.emit('pong');
    });
  });

  // Handle server-wide errors
  io.engine.on('connection_error', (error) => {
    console.error('Server connection error:', error);
  });

  // Handle upgrade errors
  io.engine.on('upgrade_error', (error) => {
    console.error('Upgrade error:', error);
  });

  // Handle invalid namespace errors
  io.of(/.*/).on('connect_error', (error) => {
    console.error('Namespace connection error:', error);
  });

  // Handle session errors
  io.engine.on('session_error', (error) => {
    console.error('Session error:', error);
  });

  // Log namespace creation
  io.of('/').on('connection', (socket) => {
    console.log('New connection to root namespace:', socket.id);
  });
}; 