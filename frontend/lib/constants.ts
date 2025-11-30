import { City } from '@/types'

export const CITIES: City[] = [
  { id: '1', name: 'Mumbai', state: 'Maharashtra', coordinates: { lat: 19.0760, lng: 72.8777 }, helperCount: 45 },
  { id: '2', name: 'Delhi', state: 'Delhi', coordinates: { lat: 28.6139, lng: 77.2090 }, helperCount: 52 },
  { id: '3', name: 'Bangalore', state: 'Karnataka', coordinates: { lat: 12.9716, lng: 77.5946 }, helperCount: 38 },
  { id: '4', name: 'Hyderabad', state: 'Telangana', coordinates: { lat: 17.3850, lng: 78.4867 }, helperCount: 32 },
  { id: '5', name: 'Chennai', state: 'Tamil Nadu', coordinates: { lat: 13.0827, lng: 80.2707 }, helperCount: 28 },
  { id: '6', name: 'Pune', state: 'Maharashtra', coordinates: { lat: 18.5204, lng: 73.8567 }, helperCount: 25 },
  { id: '7', name: 'Kolkata', state: 'West Bengal', coordinates: { lat: 22.5726, lng: 88.3639 }, helperCount: 22 },
  { id: '8', name: 'Ahmedabad', state: 'Gujarat', coordinates: { lat: 23.0225, lng: 72.5714 }, helperCount: 18 },
]

export const SERVICE_TYPES = [
  'Flat Visit & Inspection',
  'Photo & Video Documentation',
  'Price Negotiation',
  'Pickup & Delivery',
  'On-Ground Assistance',
  'Documentation Help',
  'Furniture Assembly',
  'Other',
]

export const SUBSCRIPTION_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 299,
    duration: 30,
    features: ['Unlimited task postings', 'Priority support', 'Escrow protection'],
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: 799,
    duration: 90,
    features: ['Unlimited task postings', 'Priority support', 'Escrow protection', '10% discount on tasks'],
    popular: true,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 2499,
    duration: 365,
    features: ['Unlimited task postings', 'Priority support', 'Escrow protection', '20% discount on tasks', 'Free KYC verification'],
  },
]







