# AgriBridge Database Seeders

This directory contains seeders for populating the AgriBridge database with sample data for development and testing purposes.

## Overview

The seeders use [Faker.js](https://fakerjs.dev/) to generate realistic sample data for all entities in the AgriBridge application.

## Structure

- `BaseSeeder.ts` - Base class that all seeders extend
- `utils.ts` - Utility functions for generating fake data
- `run-seed.ts` - Script to run the seeders
- Individual seeder files for each entity

## Available Seeders

- `UserSeeder.ts` - Seeds user data
- `FarmerProfileSeeder.ts` - Seeds farmer profile data
- `FarmSeeder.ts` - Seeds farm data
- `ProductSeeder.ts` - Seeds product data
- `OrderSeeder.ts` - Seeds order data
- `OrderItemSeeder.ts` - Seeds order item data
- `QRTraceabilitySeeder.ts` - Seeds QR traceability data
- `ReviewSeeder.ts` - Seeds review data
- `AuditLogSeeder.ts` - Seeds audit log data
- `LogisticsSeeder.ts` - Seeds logistics data
- `FarmingActivityLogSeeder.ts` - Seeds farming activity log data
- `SubscriptionPlanSeeder.ts` - Seeds subscription plan data
- `UserSubscriptionSeeder.ts` - Seeds user subscription data
- `NotificationSeeder.ts` - Seeds notification data
- `AdminTaskSeeder.ts` - Seeds admin task data
- `FeedbackSurveySeeder.ts` - Seeds feedback survey data
- `CommunityPostSeeder.ts` - Seeds community post data
- `PostCommentSeeder.ts` - Seeds post comment data
- `PostLikeSeeder.ts` - Seeds post like data
- `CommentLikeSeeder.ts` - Seeds comment like data
- `PaymentSeeder.ts` - Seeds payment data
- `DeliverySeeder.ts` - Seeds delivery data

## Usage

To run the seeders, use the following command:

```bash
npm run seed
```

This will seed the database with sample data for all entities.

## Dependencies

The seeders depend on the following:

1. A running PostgreSQL database
2. The database connection configured in `config/data-source.ts`
3. The Faker.js library

## Notes

- The seeders are designed to be run in a specific order to maintain referential integrity
- Each seeder checks if data already exists before seeding to avoid duplicates
- The seeders use realistic data that matches the schema of each entity 