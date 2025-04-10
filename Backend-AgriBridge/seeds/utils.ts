import { faker } from '@faker-js/faker';
import { UserType } from '../models/User';
import { OrderStatus, PaymentStatus } from '../models/Order';
import { TaskPriority, TaskStatus } from '../models/AdminTask';
import { SubscriptionStatus } from '../models/UserSubscription';
import { DeliveryStatus } from '../models';

// User related
export const generateUserData = (count: number) => {
  return Array.from({ length: count }, () => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    zip_code: faker.location.zipCode(),
    role: faker.helpers.arrayElement(Object.values(UserType)),
    isActive: faker.datatype.boolean({ probability: 0.9 }),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Farm related
export const generateFarmData = (farmerIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    farmer_id: faker.helpers.arrayElement(farmerIds),
    farm_name: faker.company.name(),
    location_lat: faker.location.latitude(),
    location_lng: faker.location.longitude(), 
    address: faker.location.streetAddress(),
    organic_certification_status: faker.datatype.boolean({ probability: 0.7 }),
    total_area: parseFloat(faker.number.float({ min: 1, max: 1000 }).toFixed(2)),
    area_unit: faker.helpers.arrayElement(['hectares', 'acres', 'square meters']),
    soil_type: faker.helpers.arrayElement(['loamy', 'sandy', 'clay', 'silt', 'black soil']),
    water_source: faker.helpers.arrayElement(['well', 'river', 'canal', 'rainwater', 'irrigation']),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Product related
export const generateProductData = (farmIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    farm_id: faker.helpers.arrayElement(farmIds),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.helpers.arrayElement(['fruits', 'vegetables', 'grains', 'dairy', 'meat']),
    price: parseFloat(faker.commerce.price({ min: 1, max: 100 })),
    stock_quantity: faker.number.int({ min: 0, max: 1000 }),
    unit: faker.helpers.arrayElement(['kg', 'lb', 'piece', 'bundle', 'box']),
    is_organic: faker.datatype.boolean({ probability: 0.7 }),
    harvest_date: faker.date.past(),
    expiry_date: faker.date.future(),
    status: faker.helpers.arrayElement(['available', 'out_of_stock', 'discontinued']),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Order related
export const generateOrderData = (userIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    total_amount: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    status: faker.helpers.arrayElement(Object.values(OrderStatus)),
    payment_status: faker.helpers.arrayElement(Object.values(PaymentStatus)),
    shipping_address: faker.location.streetAddress(),
    shipping_city: faker.location.city(),
    shipping_state: faker.location.state(),
    shipping_country: faker.location.country(),
    shipping_zip_code: faker.location.zipCode(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Order Item related
export const generateOrderItemData = (orderIds: number[], productIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    order_id: faker.helpers.arrayElement(orderIds),
    product_id: faker.helpers.arrayElement(productIds),
    quantity: faker.number.int({ min: 1, max: 10 }),
    unit_price: parseFloat(faker.commerce.price({ min: 1, max: 100 })),
    total_price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Delivery related
export const generateDeliveryData = (orderIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    order_id: faker.helpers.arrayElement(orderIds),
    tracking_number: faker.string.alphanumeric(10).toUpperCase(),
    carrier: faker.helpers.arrayElement(['FedEx', 'UPS', 'DHL', 'USPS']),
    status: faker.helpers.arrayElement(Object.values(DeliveryStatus)),
    estimated_delivery_date: faker.date.future(),
    actual_delivery_date: faker.date.future(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Review related
export const generateReviewData = (userIds: number[], productIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    product_id: faker.helpers.arrayElement(productIds),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.paragraph(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Notification related
export const generateNotificationData = (userIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    title: faker.lorem.sentence(),
    message: faker.lorem.paragraph(),
    type: faker.helpers.arrayElement(['info', 'warning', 'error', 'success']),
    is_read: faker.datatype.boolean({ probability: 0.3 }),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Admin Task related
export const generateAdminTaskData = (count: number) => {
  return Array.from({ length: count }, () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    assigned_to: faker.person.fullName(),
    priority: faker.helpers.arrayElement(Object.values(TaskPriority)),
    status: faker.helpers.arrayElement(Object.values(TaskStatus)),
    due_date: faker.date.future(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Subscription Plan related
export const generateSubscriptionPlanData = (count: number) => {
  return Array.from({ length: count }, () => ({
    name: faker.helpers.arrayElement(['Basic', 'Premium', 'Enterprise']),
    description: faker.lorem.paragraph(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
    duration_months: faker.number.int({ min: 1, max: 12 }),
    features: faker.lorem.paragraphs(3),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// User Subscription related
export const generateUserSubscriptionData = (userIds: number[], planIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    plan_id: faker.helpers.arrayElement(planIds),
    status: faker.helpers.arrayElement(Object.values(SubscriptionStatus)),
    start_date: faker.date.past(),
    end_date: faker.date.future(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Community Post related
export const generateCommunityPostData = (userIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
    likes_count: faker.number.int({ min: 0, max: 100 }),
    comments_count: faker.number.int({ min: 0, max: 50 }),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Post Comment related
export const generatePostCommentData = (postIds: number[], userIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    post_id: faker.helpers.arrayElement(postIds),
    user_id: faker.helpers.arrayElement(userIds),
    content: faker.lorem.paragraph(),
    likes_count: faker.number.int({ min: 0, max: 50 }),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Post Like related
export const generatePostLikeData = (postIds: number[], userIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    post_id: faker.helpers.arrayElement(postIds),
    user_id: faker.helpers.arrayElement(userIds),
    created_at: faker.date.past()
  }));
};

// Comment Like related
export const generateCommentLikeData = (commentIds: number[], userIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    comment_id: faker.helpers.arrayElement(commentIds),
    user_id: faker.helpers.arrayElement(userIds),
    created_at: faker.date.past()
  }));
};

// Payment related
export const generatePaymentData = (orderIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    order_id: faker.helpers.arrayElement(orderIds),
    amount: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    payment_method: faker.helpers.arrayElement(['credit_card', 'debit_card', 'paypal', 'bank_transfer']),
    transaction_id: faker.string.alphanumeric(20),
    status: faker.helpers.arrayElement(Object.values(PaymentStatus)),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// QR Traceability related
export const generateQRTraceabilityData = (productIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    product_id: faker.helpers.arrayElement(productIds),
    qr_code: faker.string.alphanumeric(20),
    batch_number: faker.string.alphanumeric(10).toUpperCase(),
    harvest_date: faker.date.past(),
    expiry_date: faker.date.future(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Audit Log related
export const generateAuditLogData = (count: number) => {
  return Array.from({ length: count }, () => ({
    user_id: faker.number.int({ min: 1, max: 100 }),
    action: faker.helpers.arrayElement(['create', 'update', 'delete', 'login', 'logout']),
    entity_type: faker.helpers.arrayElement(['user', 'product', 'order', 'farm']),
    entity_id: faker.number.int({ min: 1, max: 100 }),
    details: faker.lorem.paragraph(),
    ip_address: faker.internet.ip(),
    created_at: faker.date.past()
  }));
};

// Farming Activity Log related
export const generateFarmingActivityLogData = (farmIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    farm_id: faker.helpers.arrayElement(farmIds),
    activity_type: faker.helpers.arrayElement(['planting', 'harvesting', 'fertilizing', 'irrigation', 'pest_control']),
    description: faker.lorem.paragraph(),
    activity_date: faker.date.past(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Logistics related
export const generateLogisticsData = (orderIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    order_id: faker.helpers.arrayElement(orderIds),
    tracking_number: faker.string.alphanumeric(10).toUpperCase(),
    carrier: faker.helpers.arrayElement(['FedEx', 'UPS', 'DHL', 'USPS']),
    estimated_delivery_date: faker.date.future(),
    actual_delivery_date: faker.date.future(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
};

// Feedback Survey related
export const generateFeedbackSurveyData = (userIds: number[], count: number) => {
  return Array.from({ length: count }, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    rating: faker.number.int({ min: 1, max: 5 }),
    feedback: faker.lorem.paragraph(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent()
  }));
}; 