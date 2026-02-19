// Villa data for all properties
export interface GalleryCategory {
    name: string;
    images: string[];
}

export interface VillaData {
    slug: string;
    name: string;
    tagline: string;
    location: string;
    description: string[];
    heroImage: string;
    galleryImages: string[];
    galleryCategories?: GalleryCategory[];
    stats: {
        sleeps: number;
        floorArea: number;
        bedrooms: number;
        bathrooms: number;
    };
    rooms: {
        bedrooms: string[];
        livingDining: string[];
    };
    amenities: {
        kitchen: string[];
        internet: string[];
        services: string[];
        features: string[];
        entry: string[];
    };
    locationInfo: {
        title: string;
        description: string;
        heroImage: string;
        mapEmbedUrl: string;
        attractions: { name: string; distance: string }[];
    };
    bookingLink: string;
}

export const VILLAS: VillaData[] = [
    {
        slug: 'beach-bliss',
        name: 'Beach Bliss',
        tagline: 'A peaceful retreat with stunning ocean views',
        location: 'Nilaveli Beach, Trincomalee',
        description: [
            'Experience the perfect family vacation at our fully equipped, medium-sized apartment spanning 110 square meters. Nestled in the Oceanfront Condominium Complex, this stunning property provides everything you need for an unforgettable beachfront holiday.',
            'Our apartment features two air-conditioned bedrooms, each with en-suite bathrooms, ensuring maximum comfort and privacy. The spacious living and dining area includes a living room suite, a dining table for six, a flat-screen television, cable TV, and free Wi-Fi, offering ample space for relaxation and entertainment.',
            'Prepare your own gourmet meals in the fully equipped kitchen, complete with all modern amenities, including a gas hob, oven, microwave, fridge/freezer, kettle, toaster, rice cooker, blender, sandwich maker, water dispenser, and all necessary cooking equipment, cutlery, crockery, and glassware. The apartment also includes a washing machine, iron, and ironing board for your convenience.',
            'Enjoy limited ocean views from your private balcony and take a dip in the pristine waters of the Indian Ocean, which is just a short walk from your apartment. The renowned establishment of Diving Guru (seasonal), specializing in diving, snorkeling, whale and dolphin watching, is only a two-minute walk away.',
            'Within the complex, guests have access to two swimming pools, an exercise room, expansive gardens, and an in-house café. The café operates daily from 07.30 to 20.30, serving breakfast, lunch, and dinner, with delivery service to the apartments also available. Alternatively, guests may enjoy a variety of local beachside restaurants and bars, just a short stroll from the apartment.',
            'Located just 14 km from the historic coastal town of Trincomalee, you can visit numerous tourist sites, including the Trinco Fish Market, Fort Federick, and Koneswaram Temple. The unspoiled beauty of Sri Lanka’s eastern coast, with its wide-open beaches and calm waters, awaits you. Embrace the serenity and tranquillity of a sleepy fishing village, offering a taste of a simple, laid-back lifestyle.',
            'Our apartment is equipped with everything you need to make it your home away from home. With the pristine beach of Nilaveli as your front yard, this property is your number one choice for an idyllic beach holiday.',
            'If you are looking for the perfect beach getaway, the time is here and now'
        ],
        heroImage: '/Beach-Bliss-Home.jpg',
        galleryImages: [
            // Living Room
            '/beach-bliss/living-room-main.jpg',
            '/beach-bliss/living-room-balcony-view.jpeg',
            '/beach-bliss/living-room-sofa.jpg',
            '/beach-bliss/living-room-perspective-1.jpeg',
            '/beach-bliss/living-room-perspective-2.jpeg',
            '/beach-bliss/living-room-seating.jpg',
            // Kitchen
            '/beach-bliss/kitchen-main.jpeg',
            '/beach-bliss/kitchen-appliances.jpeg',
            // Dining
            '/beach-bliss/dining-table.jpg',
            // Master Bedroom
            '/beach-bliss/master-bedroom-main.jpg',
            '/beach-bliss/master-bedroom-side.jpg',
            '/beach-bliss/master-bedroom-setup.jpeg',
            '/beach-bliss/master-bedroom-closet.jpeg',
            // Bedroom 1
            '/beach-bliss/bedroom-1-main.jpg',
            '/beach-bliss/bedroom-1-perspective.jpg',
            // Exterior
            '/beach-bliss/exterior-building.jpg',
            '/beach-bliss/exterior-balcony-terrace.jpeg',
            '/beach-bliss/exterior-ocean-view.jpeg',
            '/beach-bliss/exterior-architecture.jpg',
            '/beach-bliss/exterior-night.jpg',
            '/beach-bliss/exterior-entrance.jpeg',
            // Pool & Gym
            '/beach-bliss/pool-main.jpg',
            '/beach-bliss/pool-deck.jpg',
            '/beach-bliss/pool-wide.jpg',
            '/beach-bliss/gym-interior.jpg',
            '/beach-bliss/pool-amenities.jpeg',
            '/beach-bliss/pool-perspective.jpeg',
        ],
        galleryCategories: [
            {
                name: 'Living Room',
                images: [
                    '/beach-bliss/living-room-main.jpg',
                    '/beach-bliss/living-room-balcony-view.jpeg',
                    '/beach-bliss/living-room-sofa.jpg',
                    '/beach-bliss/living-room-perspective-1.jpeg',
                    '/beach-bliss/living-room-perspective-2.jpeg',
                    '/beach-bliss/living-room-seating.jpg',
                ]
            },
            {
                name: 'Kitchen',
                images: [
                    '/beach-bliss/kitchen-main.jpeg',
                    '/beach-bliss/kitchen-appliances.jpeg',
                ]
            },
            {
                name: 'Dining Area',
                images: [
                    '/beach-bliss/dining-table.jpg',
                ]
            },
            {
                name: 'Master Bedroom',
                images: [
                    '/beach-bliss/master-bedroom-main.jpg',
                    '/beach-bliss/master-bedroom-side.jpg',
                    '/beach-bliss/master-bedroom-setup.jpeg',
                    '/beach-bliss/master-bedroom-closet.jpeg',
                ]
            },
            {
                name: 'Bedroom 1',
                images: [
                    '/beach-bliss/bedroom-1-main.jpg',
                    '/beach-bliss/bedroom-1-perspective.jpg',
                ]
            },
            {
                name: 'Exterior',
                images: [
                    '/beach-bliss/exterior-building.jpg',
                    '/beach-bliss/exterior-balcony-terrace.jpeg',
                    '/beach-bliss/exterior-ocean-view.jpeg',
                    '/beach-bliss/exterior-architecture.jpg',
                    '/beach-bliss/exterior-night.jpg',
                    '/beach-bliss/exterior-entrance.jpeg',
                ]
            },
            {
                name: 'Gym and Swimming Pool',
                images: [
                    '/beach-bliss/pool-main.jpg',
                    '/beach-bliss/pool-deck.jpg',
                    '/beach-bliss/pool-wide.jpg',
                    '/beach-bliss/gym-interior.jpg',
                    '/beach-bliss/pool-amenities.jpeg',
                    '/beach-bliss/pool-perspective.jpeg',
                ]
            },
        ],
        stats: {
            sleeps: 4,
            floorArea: 110,
            bedrooms: 2,
            bathrooms: 2
        },
        rooms: {
            bedrooms: [
                '2 air-conditioned bedrooms, both with en-suite bathrooms',
                'Wardrobes in both bedrooms'
            ],
            livingDining: [
                'Spacious, air-conditioned living and dining area',
                'Flat-screen television with separate cable TV connection',
                'Living room suite and dining table for 6 people'
            ]
        },
        amenities: {
            kitchen: [
                'Modern kitchen with gas hob, oven, microwave, family-sized fridge/freezer',
                'Fully equipped with kettle, toaster, rice cooker, blender, sandwich maker, water dispenser',
                'All cooking equipment, cutlery, crockery, and glassware provided',
                'Washing machine, iron, and ironing board'
            ],
            internet: [
                'Free Fiber Optic Internet with 10 GB/day (upgradable to 25 GB/day at a nominal cost).'
            ],
            services: [
                'Bed linen, full set of towels, pool towels',
                'Shower gel, shampoo, conditioner, hand soap, kitchen detergent, washing powder, toilet rolls, drinking water',
                'Starter pack of tea, coffee, milk, sugar',
                'Housekeeping services every 5th day with full cleaning, bed linen change, and fresh towels'
            ],
            features: [
                'Private balcony with limited ocean views'
            ],
            entry: [
                'Electronic key card access (one card per group per stay)',
                'Extra key cards: LKR 2500/day',
                'Charge for lost/missing key cards'
            ]
        },
        locationInfo: {
            title: 'Perfect Beach Getaway',
            description: 'Located in the Oceanfront Condominium Complex, just steps from Nilaveli Beach and near Pigeon Island National Park. Enjoy panoramic ocean vistas, outdoor swimming pools, and an in-house cafe with delivery service.',
            heroImage: '/beach-bliss/exterior-ocean-view.jpeg',
            mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15776.356368386987!2d81.18914385742943!3d8.683077661840388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afbbe5102749c6b%3A0x998dacb0a42ea612!2sOceanfront%20Condominium%20-%20Nilaveli!5e0!3m2!1sen!2slk!4v1769942048691!5m2!1sen!2slk',
            attractions: [
                { name: 'Pigeon Island', distance: '2 km' },
                { name: 'Velgam Vehera', distance: '12 km' },
                { name: 'Kanniya Hot Springs', distance: '14 km' },
                { name: 'Trincomalee Town', distance: '14 km' },
                { name: 'China Bay Airport', distance: '29 km' }
            ]
        },
        bookingLink: '#contact'
    },
    {
        slug: 'sandy-shores',
        name: 'Sandy Shores',
        tagline: 'A cozy beachside escape just steps from the sand',
        location: 'Nilaveli Beach, Trincomalee',
        description: [
            'Escape to our fully equipped apartment, perfect for a family vacation. Located in the Oceanfront Condominium Complex, this 217 square meter apartment offers everything you need for a complete beachfront holiday. Enjoy the two swimming pools, an in-house café, and an exercise room.',
            'Wake up to stunning sunrises from your spacious balcony with breathtaking ocean views. End your day with a glass of your favorite beverage while listening to the soothing melody of the waves. The pristine waters of the Indian Ocean are just a minute\'s walk away, along with the renowned establishment of Diving Guru (seasonal), specializing in diving, snorkeling, whale and dolphin watching, is only a two-minute walk away.',
            'Our fully equipped kitchen allows you to prepare gourmet meals, and the apartment also features a washing machine. This truly is your home away from home.',
            'Within the complex, guests have access to two swimming pools, an exercise room, expansive gardens, and an in-house café. The café operates daily from 07.30 to 20.30, serving breakfast, lunch, and dinner, with delivery service to the apartments also available. Alternatively, guests may enjoy a variety of local beachside restaurants and bars, just a short stroll from the apartment.',
            'Only 14 km from the historic coastal town of Trincomalee, you can visit sites such as the Trinco Fish Market, Fort Federick, and Koneswaram Temple. Experience the unspoiled beauty of Sri Lanka\'s eastern coast with wide open beaches and calm waters. Embrace the serenity and tranquillity of a sleepy fishing village, offering a taste of a simple, laid-back lifestyle.',
            'Our apartment is equipped with everything you need to make it your home away from home, with fantastic ocean vistas from your private balcony and Nilaveli Beach as your front yard. This property is your number one choice for an idyllic beach holiday.',
            'If you are looking for the perfect beach getaway, the time is here and now.'
        ],
        heroImage: '/sandy-shores-main.jpg',
        galleryImages: [
            // Living Room
            '/sandy-shores/living-room-1.jpg',
            '/sandy-shores/living-room-2.jpg',
            '/sandy-shores/living-room-3.jpg',
            '/sandy-shores/living-room-4.jpg',
            // Kitchen
            '/sandy-shores/kitchen-1.jpg',
            '/sandy-shores/kitchen-2.jpg',
            // Dining
            '/sandy-shores/dining-1.jpg',
            '/sandy-shores/dining-2.avif',
            // Balcony
            '/sandy-shores/balcony-1.jpg',
            '/sandy-shores/balcony-2.jpg',
            // Master Bedroom
            '/sandy-shores/master-bedroom-1.jpg',
            '/sandy-shores/master-bedroom-2.jpg',
            '/sandy-shores/master-bedroom-3.jpg',
            '/sandy-shores/master-bedroom-4.jpg',
            '/sandy-shores/master-bedroom-5.jpg',
            // Bedroom 1
            '/sandy-shores/bedroom-1-main.jpg',
            '/sandy-shores/bedroom-1-2.jpg',
            '/sandy-shores/bedroom-1-3.jpeg',
            '/sandy-shores/bedroom-1-4.jpg',
            // Bedroom 2
            '/sandy-shores/bedroom-2-main.jpg',
            '/sandy-shores/bedroom-2-2.jpeg',
            '/sandy-shores/bedroom-2-3.jpg',
            '/sandy-shores/bedroom-2-4.jpg',
            // Exterior
            '/sandy-shores/exterior-1.jpeg',
            '/sandy-shores/exterior-2.jpg',
            '/sandy-shores/exterior-3.jpeg',
            '/sandy-shores/exterior-4.jpg',
            '/sandy-shores/exterior-5.jpg',
            '/sandy-shores/exterior-6.jpeg',
            // Pool & Gym
            '/sandy-shores/pool-1.jpg',
            '/sandy-shores/gym-1.jpg',
            '/sandy-shores/pool-2.jpeg',
            '/sandy-shores/pool-3.jpeg',
        ],
        galleryCategories: [
            {
                name: 'Living Room',
                images: [
                    '/sandy-shores/living-room-1.jpg',
                    '/sandy-shores/living-room-2.jpg',
                    '/sandy-shores/living-room-3.jpg',
                    '/sandy-shores/living-room-4.jpg',
                ]
            },
            {
                name: 'Kitchen',
                images: [
                    '/sandy-shores/kitchen-1.jpg',
                    '/sandy-shores/kitchen-2.jpg',
                ]
            },
            {
                name: 'Dining Area',
                images: [
                    '/sandy-shores/dining-1.jpg',
                    '/sandy-shores/dining-2.avif',
                ]
            },
            {
                name: 'Balcony',
                images: [
                    '/sandy-shores/balcony-1.jpg',
                    '/sandy-shores/balcony-2.jpg',
                ]
            },
            {
                name: 'Master Bedroom',
                images: [
                    '/sandy-shores/master-bedroom-1.jpg',
                    '/sandy-shores/master-bedroom-2.jpg',
                    '/sandy-shores/master-bedroom-3.jpg',
                    '/sandy-shores/master-bedroom-4.jpg',
                    '/sandy-shores/master-bedroom-5.jpg',
                ]
            },
            {
                name: 'Bedroom 1',
                images: [
                    '/sandy-shores/bedroom-1-main.jpg',
                    '/sandy-shores/bedroom-1-2.jpg',
                    '/sandy-shores/bedroom-1-3.jpeg',
                    '/sandy-shores/bedroom-1-4.jpg',
                ]
            },
            {
                name: 'Bedroom 2',
                images: [
                    '/sandy-shores/bedroom-2-main.jpg',
                    '/sandy-shores/bedroom-2-2.jpeg',
                    '/sandy-shores/bedroom-2-3.jpg',
                    '/sandy-shores/bedroom-2-4.jpg',
                ]
            },
            {
                name: 'Exterior',
                images: [
                    '/sandy-shores/exterior-1.jpeg',
                    '/sandy-shores/exterior-2.jpg',
                    '/sandy-shores/exterior-3.jpeg',
                    '/sandy-shores/exterior-4.jpg',
                    '/sandy-shores/exterior-5.jpg',
                    '/sandy-shores/exterior-6.jpeg',
                ]
            },
            {
                name: 'Gym and Swimming Pool',
                images: [
                    '/sandy-shores/pool-1.jpg',
                    '/sandy-shores/gym-1.jpg',
                    '/sandy-shores/pool-2.jpeg',
                    '/sandy-shores/pool-3.jpeg',
                ]
            },
        ],
        stats: {
            sleeps: 6,
            floorArea: 217,
            bedrooms: 3,
            bathrooms: 2
        },
        rooms: {
            bedrooms: [
                '3 air-conditioned bedrooms',
                '2 bathrooms (Master bedroom with en-suite and double vanity)',
                'Wardrobes in all bedrooms'
            ],
            livingDining: [
                'Spacious, air-conditioned living and dining area',
                'Flat-screen television with separate cable TV connection',
                'Living room suite and dining table for 6 people'
            ]
        },
        amenities: {
            kitchen: [
                'Modern kitchen with gas hob, oven, microwave, family-sized fridge/freezer',
                'Fully equipped with kettle, toaster, rice cooker, blender, sandwich maker, water dispenser',
                'All cooking equipment, cutlery, crockery, and glassware provided'
            ],
            internet: [
                'Free Fiber Optic Internet with 10 GB/day (upgradable to 25 GB/day at a nominal cost)'
            ],
            services: [
                'Bed linen, full set of towels, pool towels',
                'Shower gel, shampoo, conditioner, hand soap, kitchen detergent, washing powder, toilet rolls, drinking water',
                'Starter pack of tea, coffee, milk, sugar',
                'Housekeeping services every 5th day with full cleaning, bed linen change, and fresh towels',
                'Iron and Ironing Board',
                'Washing machine'
            ],
            features: [
                'Extra spacious balcony with fantastic beach and ocean views',
                'Outdoor furniture: suite, table, chairs, and 2 sun lounges'
            ],
            entry: [
                'Electronic key card access (one card per group per stay)',
                'Extra key cards: LKR 2500/day',
                'Charge for lost/missing key cards'
            ]
        },
        locationInfo: {
            title: 'Perfect Beach Getaway',
            description: 'Located in the Oceanfront Condominium Complex, just steps from Nilaveli Beach and near Pigeon Island National Park. Enjoy panoramic ocean vistas, outdoor swimming pools, and an in-house cafe with delivery service.',
            heroImage: '/sandy-shores/exterior-3.jpeg',
            mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15776.356368386987!2d81.18914385742943!3d8.683077661840388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afbbe5102749c6b%3A0x998dacb0a42ea612!2sOceanfront%20Condominium%20-%20Nilaveli!5e0!3m2!1sen!2slk!4v1769942048691!5m2!1sen!2slk',
            attractions: [
                { name: 'Velgam Vehera', distance: '12 km' },
                { name: 'Kanniya Hot Springs', distance: '14 km' },
                { name: 'China Bay Airport', distance: '29 km' },
                { name: 'Trincomalee', distance: '14 km' }
            ]
        },
        bookingLink: '#contact'
    },
    {
        slug: 'luxury-penthouse',
        name: 'Luxury Penthouse',
        tagline: 'An elegant haven with breathtaking panoramic views',
        location: 'Nilaveli Beach, Trincomalee',
        description: [
            'Nestled in the serene and picturesque Nilaveli Beach, our luxury penthouse offers an unparalleled getaway experience. With a spacious floor area of 232 square meters, including a private jacuzzi on the rooftop sun deck, (accessible from outside the apartment). Our penthouse is designed to provide maximum comfort and luxury for up to six guests.',
            'Our three-bedroom penthouse is fully air-conditioned and furnished with modern amenities to make your stay as enjoyable as possible. The master bedroom features an en-suite bathroom and a flat-screen TV with separate cable TV connection, while all bedrooms are equipped with wardrobes for your convenience.',
            'The living and dining area is perfect for relaxation and entertainment, complete with a flat-screen TV, a dining table for six, and a JBL Bluetooth speaker. Our fully equipped kitchen includes everything you need to prepare your own gourmet meals, from an induction hob and oven to a dishwasher and rice cooker.',
            'Enjoy breathtaking views of the beach and the Indian Ocean from our spacious balcony or unwind in your private jacuzzi on the rooftop sun deck. We provide Free Fiber Optic Internet with options for additional data, ensuring you stay connected during your stay.',
            'Within the complex, guests have access to two swimming pools, an exercise room, expansive gardens, and an in-house café. The café operates daily from 07.30 to 20.30, serving breakfast, lunch, and dinner, with delivery service to the apartments also available. Alternatively, guests may enjoy a variety of local beachside restaurants and bars, just a short stroll from the apartment.',
            'At The Luxury Penthouse, we prioritize your comfort and convenience, offering comprehensive housekeeping services, premium amenities, and exceptional service. Whether you\'re here to explore the stunning natural beauty of Sri Lanka or simply relax and rejuvenate, our penthouse provides the perfect setting for your beach getaway.',
            'Welcome to your home away from home.'
        ],
        heroImage: '/Luxury-Penthouse-Home.jpg',
        galleryImages: [
            // Living Room
            '/luxury-penthouse/living-room-1.jpg',
            '/luxury-penthouse/living-room-2.jpg',
            '/luxury-penthouse/living-room-3.jpg',
            '/luxury-penthouse/living-room-4.jpg',
            // Kitchen
            '/luxury-penthouse/kitchen-1.jpg',
            '/luxury-penthouse/kitchen-2.jpg',
            // Dining
            '/luxury-penthouse/dining-1.jpg',
            '/luxury-penthouse/dining-2.jpeg',
            // Balcony
            '/luxury-penthouse/balcony-1.jpg',
            '/luxury-penthouse/balcony-2.jpg',
            // Master Bedroom
            '/luxury-penthouse/master-bedroom-1.jpg',
            '/luxury-penthouse/master-bedroom-2.jpg',
            '/luxury-penthouse/master-bedroom-3.jpg',
            '/luxury-penthouse/master-bedroom-4.jpg',
            // Bedroom 1
            '/luxury-penthouse/bedroom-1-1.jpg',
            '/luxury-penthouse/bedroom-1-2.jpg',
            '/luxury-penthouse/bedroom-1-3.jpg',
            '/luxury-penthouse/bedroom-1-4.jpg',
            // Bedroom 2
            '/luxury-penthouse/bedroom-2-1.jpg',
            '/luxury-penthouse/bedroom-2-2.jpg',
            // Rooftop Jacuzzi
            '/luxury-penthouse/jacuzzi-1.jpg',
            '/luxury-penthouse/jacuzzi-2.jpg',
            '/luxury-penthouse/jacuzzi-3.jpg',
            '/luxury-penthouse/jacuzzi-4.jpg',
            // Exterior
            '/luxury-penthouse/exterior-1.jpg',
            '/luxury-penthouse/exterior-2.jpg',
            '/luxury-penthouse/exterior-3.jpg',
            '/luxury-penthouse/exterior-4.jpg',
            // Pool & Gym
            '/luxury-penthouse/pool-1.jpg',
            '/luxury-penthouse/pool-2.jpg',
            '/luxury-penthouse/pool-3.jpg',
            '/luxury-penthouse/pool-4.jpg',
            '/luxury-penthouse/pool-5.jpeg',
            '/luxury-penthouse/gym-1.jpg',
        ],
        galleryCategories: [
            {
                name: 'Living Room',
                images: [
                    '/luxury-penthouse/living-room-1.jpg',
                    '/luxury-penthouse/living-room-2.jpg',
                    '/luxury-penthouse/living-room-3.jpg',
                    '/luxury-penthouse/living-room-4.jpg',
                ]
            },
            {
                name: 'Kitchen',
                images: [
                    '/luxury-penthouse/kitchen-1.jpg',
                    '/luxury-penthouse/kitchen-2.jpg',
                ]
            },
            {
                name: 'Dining Area',
                images: [
                    '/luxury-penthouse/dining-1.jpg',
                    '/luxury-penthouse/dining-2.jpeg',
                ]
            },
            {
                name: 'Balcony',
                images: [
                    '/luxury-penthouse/balcony-1.jpg',
                    '/luxury-penthouse/balcony-2.jpg',
                ]
            },
            {
                name: 'Master Bedroom',
                images: [
                    '/luxury-penthouse/master-bedroom-1.jpg',
                    '/luxury-penthouse/master-bedroom-2.jpg',
                    '/luxury-penthouse/master-bedroom-3.jpg',
                    '/luxury-penthouse/master-bedroom-4.jpg',
                ]
            },
            {
                name: 'Bedroom 1',
                images: [
                    '/luxury-penthouse/bedroom-1-1.jpg',
                    '/luxury-penthouse/bedroom-1-2.jpg',
                    '/luxury-penthouse/bedroom-1-3.jpg',
                    '/luxury-penthouse/bedroom-1-4.jpg',
                ]
            },
            {
                name: 'Bedroom 2',
                images: [
                    '/luxury-penthouse/bedroom-2-1.jpg',
                    '/luxury-penthouse/bedroom-2-2.jpg',
                ]
            },
            {
                name: 'Rooftop Jacuzzi',
                images: [
                    '/luxury-penthouse/jacuzzi-1.jpg',
                    '/luxury-penthouse/jacuzzi-2.jpg',
                    '/luxury-penthouse/jacuzzi-3.jpg',
                    '/luxury-penthouse/jacuzzi-4.jpg',
                ]
            },
            {
                name: 'Exterior',
                images: [
                    '/luxury-penthouse/exterior-1.jpg',
                    '/luxury-penthouse/exterior-2.jpg',
                    '/luxury-penthouse/exterior-3.jpg',
                    '/luxury-penthouse/exterior-4.jpg',
                ]
            },
            {
                name: 'Gym and Swimming Pool',
                images: [
                    '/luxury-penthouse/pool-1.jpg',
                    '/luxury-penthouse/pool-2.jpg',
                    '/luxury-penthouse/pool-3.jpg',
                    '/luxury-penthouse/pool-4.jpg',
                    '/luxury-penthouse/pool-5.jpeg',
                    '/luxury-penthouse/gym-1.jpg',
                ]
            },
        ],
        stats: {
            sleeps: 6,
            floorArea: 232,
            bedrooms: 3,
            bathrooms: 2
        },
        rooms: {
            bedrooms: [
                '3 air-conditioned bedrooms, 2 toilets',
                'Master bedroom with en-suite bathroom and TV',
                'Wardrobes in both bedrooms'
            ],
            livingDining: [
                'Spacious, air-conditioned area with flat-screen TV and JBL Bluetooth speaker',
                'Dining table for 6 people'
            ]
        },
        amenities: {
            kitchen: [
                'Modern kitchen with induction hob, oven, microwave, family-sized fridge/freezer, dishwasher, and more',
                'Fully equipped with cooking utensils, cutlery, crockery, and glassware'
            ],
            internet: [
                'Free Fiber Optic Internet with 10 GB/day (upgradable to 25 GB/day at a nominal cost)'
            ],
            services: [
                'Bed linen, towels, pool towels, shower gel, shampoo, conditioner, hand soap, kitchen detergent, washing powder, and toilet rolls',
                'Starter pack of tea, coffee, milk, sugar, and one dishwasher tablet per day',
                'Washing machine and clothes dryer',
                'Iron and Ironing Board',
                'Housekeeping services every 5th day with full cleaning, bed linen change, and fresh towels'
            ],
            features: [
                'Spacious balcony with beach and ocean views',
                'Outdoor dining table for 6',
                'Access to a Private jacuzzi and sundeck on the rooftop'
            ],
            entry: [
                'Electronic key card access (one card per group per stay)',
                'Extra key cards: LKR 2500/day',
                'Charge for lost/missing key cards'
            ]
        },
        locationInfo: {
            title: 'Perfect Beach Getaway',
            description: 'Located in the Oceanfront Condominium Complex, just steps from Nilaveli Beach and near Pigeon Island National Park. Enjoy panoramic ocean vistas, outdoor swimming pools, and an in-house cafe with delivery service.',
            heroImage: '/luxury-penthouse/exterior-2.jpg',
            mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15776.356368386987!2d81.18914385742943!3d8.683077661840388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afbbe5102749c6b%3A0x998dacb0a42ea612!2sOceanfront%20Condominium%20-%20Nilaveli!5e0!3m2!1sen!2slk!4v1769942048691!5m2!1sen!2slk',
            attractions: [
                { name: 'Velgam Vehera', distance: '12 km' },
                { name: 'Kanniya Hot Springs', distance: '14 km' },
                { name: 'China Bay Airport', distance: '29 km' },
                { name: 'Trincomalee', distance: '14 km' }
            ]
        },
        bookingLink: '#contact'
    },
    {
        slug: 'hill-haven',
        name: 'Hill Haven',
        tagline: 'A colonial bungalow embraced by lush tea plantations',
        location: 'Nuwara Eliya, Hill Country',
        description: [
            'Nestled within a serene gated community of "Willows", this spectacular Colonial bungalow offers the ultimate escape. Perched amidst the lush, rolling hills of Upcot and surrounded by an expansive tea plantation, this home is a haven of tranquility and luxury.',
            'Fully equipped to meet your every need, the bungalow comes with a private chef, attentive butler and houseboy services, ensuring your stay is elevated to perfection. A full menu is available, or if you prefer, bring your own provisions and have them expertly prepared to your taste.',
            'The residence features three beautifully appointed bedrooms, three bathrooms, two with its own en-suite bathroom, as well as a cozy living and dining area. Step out onto the spacious patio or relax in your private garden, both offering breathtaking views of the tea plantation. To ensure your comfort, all rooms and bathrooms are equipped with heaters, and all essential amenities—including shampoo, conditioner, and body wash—are provided. Simply unpack and start unwinding.',
            'Within the complex, you\'ll find a 9-hole golf course, tennis courts, kayaking, heated swimming pool, and a clubhouse for refreshments. For outdoor enthusiasts, the surrounding hills offer a wealth of hiking opportunities, both within the complex and beyond, showcasing the natural wonders of Sri Lanka\'s heartland.',
            'For those seeking a spiritual journey, Sri Pada (Adam\'s Peak) is just 24 kilometers away, making it a convenient and enriching day trip.',
            'This enchanting retreat promises the perfect blend of peace, luxury, and adventure. Whether you\'re looking to relax or explore, it\'s all here waiting for you.'
        ],
        heroImage: '/hill-main.jpg',
        galleryImages: [
            // Living Room
            '/hill-haven/living-room-1.jpg',
            '/hill-haven/living-room-2.jpg',
            '/hill-haven/living-room-3.jpg',
            '/hill-haven/living-room-4.jpg',
            // Dining Area
            '/hill-haven/dining-1.jpg',
            '/hill-haven/dining-2.jpg',
            // Master Bedroom
            '/hill-haven/master-bedroom-1.jpg',
            '/hill-haven/master-bedroom-2.jpg',
            '/hill-haven/master-bedroom-3.jpg',
            '/hill-haven/master-bedroom-4.jpg',
            // Bedroom 1
            '/hill-haven/bedroom-1-1.jpg',
            '/hill-haven/bedroom-1-2.jpg',
            '/hill-haven/bedroom-1-3.jpg',
            '/hill-haven/bedroom-1-4.jpg',
            // Bedroom 2
            '/hill-haven/bedroom-2-1.jpg',
            '/hill-haven/bedroom-2-2.jpg',
            // Patio
            '/hill-haven/patio-1.jpg',
            '/hill-haven/patio-2.jpg',
            '/hill-haven/patio-3.jpg',
            '/hill-haven/patio-4.jpg',
            // Exterior
            '/hill-haven/exterior-1.jpg',
            '/hill-haven/exterior-2.jpg',
            '/hill-haven/exterior-3.jpg',
            '/hill-haven/exterior-4.jpg',
        ],
        galleryCategories: [
            {
                name: 'Living Room',
                images: [
                    '/hill-haven/living-room-1.jpg',
                    '/hill-haven/living-room-2.jpg',
                    '/hill-haven/living-room-3.jpg',
                    '/hill-haven/living-room-4.jpg',
                ]
            },
            {
                name: 'Dining Area',
                images: [
                    '/hill-haven/dining-1.jpg',
                    '/hill-haven/dining-2.jpg',
                ]
            },
            {
                name: 'Master Bedroom',
                images: [
                    '/hill-haven/master-bedroom-1.jpg',
                    '/hill-haven/master-bedroom-2.jpg',
                    '/hill-haven/master-bedroom-3.jpg',
                    '/hill-haven/master-bedroom-4.jpg',
                ]
            },
            {
                name: 'Bedroom 1',
                images: [
                    '/hill-haven/bedroom-1-1.jpg',
                    '/hill-haven/bedroom-1-2.jpg',
                    '/hill-haven/bedroom-1-3.jpg',
                    '/hill-haven/bedroom-1-4.jpg',
                ]
            },
            {
                name: 'Bedroom 2',
                images: [
                    '/hill-haven/bedroom-2-1.jpg',
                    '/hill-haven/bedroom-2-2.jpg',
                ]
            },
            {
                name: 'Patio',
                images: [
                    '/hill-haven/patio-1.jpg',
                    '/hill-haven/patio-2.jpg',
                    '/hill-haven/patio-3.jpg',
                    '/hill-haven/patio-4.jpg',
                ]
            },
            {
                name: 'Exterior',
                images: [
                    '/hill-haven/exterior-1.jpg',
                    '/hill-haven/exterior-2.jpg',
                    '/hill-haven/exterior-3.jpg',
                    '/hill-haven/exterior-4.jpg',
                ]
            },
        ],
        stats: {
            sleeps: 6,
            floorArea: 320,
            bedrooms: 3,
            bathrooms: 3
        },
        rooms: {
            bedrooms: [
                '3 bedrooms (All bedrooms include heating, fans and wardrobes)',
                '3 toilets (two en-suite and all 3 toilets have heaters and heated towel racks)'
            ],
            livingDining: [
                'Spacious living area and dining area',
                'Flat-screen television with TV connection',
                'Dining table for 10 people'
            ]
        },
        amenities: {
            kitchen: [
                'Modern kitchen with gas hob, oven, microwave, family-sized fridge/freezer',
                'Fully equipped with kettle, toaster, rice cooker, blender, sandwich maker, water dispenser',
                'All cooking equipment, cutlery, crockery, and glassware provided'
            ],
            internet: [
                'Free Unlimited WiFi'
            ],
            services: [
                'Bed linen, full set of towels and pool towels',
                'Shower gel, shampoo, conditioner and hand soap',
                'Personal Butler and your private cook',
                'Housekeeping services every 5th day with full cleaning, bed linen change, and fresh towels'
            ],
            features: [
                'Patio with panoramic views of the lush tea plantations and surrounding hills'
            ],
            entry: [
                'Electronic key card access (one card per group per stay)',
                'Extra key cards: LKR 2500/day',
                'Charge for lost/missing key cards'
            ]
        },
        locationInfo: {
            title: 'Hill Country Retreat',
            description: 'Nestled in the misty hills of Nuwara Eliya, Hill Haven offers a unique escape from the tropical coast. Surrounded by tea plantations and colonial heritage, experience the cool climate and stunning landscapes of Sri Lanka\'s highlands.',
            heroImage: '/hill-haven/exterior-3.jpg',
            mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31688.4!2d80.7673!3d6.9497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTYnNTkuMCJOIDgwwrA0NicwMi4wIkU!5e0!3m2!1sen!2slk!4v1600000000000!5m2!1sen!2slk',
            attractions: [
                { name: 'Victoria Park', distance: '3 km' },
                { name: 'Gregory Lake', distance: '4 km' },
                { name: 'Hakgala Botanical Garden', distance: '10 km' },
                { name: 'Horton Plains', distance: '32 km' },
                { name: 'Nuwara Eliya Golf Course', distance: '2 km' }
            ]
        },
        bookingLink: '#contact'
    }
];

export function getVillaBySlug(slug: string): VillaData | undefined {
    return VILLAS.find(villa => villa.slug === slug);
}
