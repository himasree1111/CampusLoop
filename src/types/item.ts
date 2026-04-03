export interface Item {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  category: string;
  condition?: string;
  location: string;
  image_url?: string;
  tags?: string[];
  status: 'available' | 'pending' | 'approved' | 'given';
  requests?: number;
  created_at: string;
  updated_at: string;
}

export interface ListingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  image?: string;
  status: 'pending' | 'approved' | 'given';
  requests: number;
  postedDate: string;
}

export interface SwapItem extends Item {
  postedBy: string;
  postedDate: string;
  image?: string;
  tags: string[];
  condition: string;
}
