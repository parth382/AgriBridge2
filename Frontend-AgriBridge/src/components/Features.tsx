import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaTruck, FaHandshake, FaChartLine } from 'react-icons/fa';

const features = [
  {
    name: 'Fresh Produce',
    description: 'Get access to the freshest, locally grown produce directly from farmers.',
    icon: FaLeaf,
    color: 'from-green-100 to-green-50',
  },
  {
    name: 'Direct Delivery',
    description: 'Fast and reliable delivery from farm to your doorstep.',
    icon: FaTruck,
    color: 'from-blue-100 to-blue-50',
  },
  {
    name: 'Fair Trade',
    description: 'Support local farmers with fair prices and transparent transactions.',
    icon: FaHandshake,
    color: 'from-yellow-100 to-yellow-50',
  },
  {
    name: 'Market Insights',
    description: 'Real-time market data and trends for better decision making.',
    icon: FaChartLine,
    color: 'from-purple-100 to-purple-50',
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose AgriBridge?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              We're revolutionizing the way farmers and consumers connect
            </p>
          </motion.div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className={`relative bg-gradient-to-br ${feature.color} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <feature.icon className="h-12 w-12 text-gray-800 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  
                  {/* Decorative elements */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features; 