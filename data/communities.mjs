// Dubai communities. Each entry renders /communities/<slug>/.
// Facts here must be stable and verifiable (master developer, home types, sub-communities, landmarks).
// Never add prices, yields, rental returns, distances in minutes or handover dates without a dated source.
// wiki: English Wikipedia article used for the background link and the licensed community photograph.
export default [
  {
    slug: 'dubai-hills-estate', name: 'Dubai Hills Estate', developers: ['emaar', 'meraas'], types: ['Apartment', 'Villa', 'Townhouse'],
    wiki: 'Dubai_Hills_Estate', area: 'Mohammed Bin Rashid City, between Al Khail Road and Umm Suqeim Street',
    intro: 'A green master community by Emaar and Meraas, built around an 18-hole golf course, Dubai Hills Park and Dubai Hills Mall.',
    about: [
      'Dubai Hills Estate was planned as a city within the city. Apartment buildings cluster around the mall, the park and the golf course, while the villa and townhouse neighbourhoods sit in quieter, gated districts further in.',
      'Buyers choose it for the balance of space and convenience. Families look at the villa districts and the schools inside the community, while apartment buyers compare towers by their view of the park, the golf course or the Downtown skyline.',
      'Many of the newer apartment projects here are Emaar launches. Ask us to compare the outlook, floor plan and service charge of individual buildings, because they vary across the community.'
    ],
    subcommunities: ['Sidra', 'Maple', 'Parkways', 'Golf Place', 'Club Villas', 'Fairway Vistas', 'Collective', 'Park Heights', 'Mulberry', 'Acacia', 'Executive Residences', 'Socio', 'Park Ridge', 'Golfville'],
    landmarks: ['Dubai Hills Mall', 'Dubai Hills Golf Club', 'Dubai Hills Park', 'King’s College Hospital Dubai'],
    suits: ['Families who want parks and schools nearby', 'Golf lovers', 'First-time buyers looking at new Emaar apartments']
  },
  {
    slug: 'downtown-dubai', name: 'Downtown Dubai', developers: ['emaar'], types: ['Apartment'],
    wiki: 'Downtown_Dubai', area: 'Sheikh Zayed Road and Financial Centre Road, beside Business Bay',
    intro: 'Emaar’s flagship district around Burj Khalifa, The Dubai Mall and the Dubai Fountain.',
    about: [
      'Downtown Dubai is the address most visitors recognise first. Residential towers line the Boulevard and look over the Burj Lake, the Dubai Fountain and Burj Khalifa itself.',
      'Living here means walking distance to The Dubai Mall, Dubai Opera and Souk Al Bahar, with the Metro on the Sheikh Zayed Road side. The district is almost entirely apartments, from studios to large penthouses.',
      'Downtown homes differ a lot by building age, view and floor. We help buyers and tenants compare Burj Khalifa and fountain views with quieter boulevard units and the newer towers of the Opera District.'
    ],
    subcommunities: ['Opera District', 'Old Town', 'The Boulevard', 'Burj Khalifa District', 'South Ridge', 'Burj Views', 'The Lofts'],
    landmarks: ['Burj Khalifa', 'The Dubai Mall', 'Dubai Fountain', 'Dubai Opera', 'Souk Al Bahar'],
    suits: ['Buyers who want a landmark address', 'Professionals working in DIFC or Business Bay', 'Short-stay and holiday home investors']
  },
  {
    slug: 'dubai-marina', name: 'Dubai Marina', developers: ['emaar'], types: ['Apartment'],
    wiki: 'Dubai_Marina', area: 'Between Sheikh Zayed Road and the Jumeirah Beach Residence coast',
    intro: 'A waterfront district of residential towers around a man-made marina, master planned by Emaar.',
    about: [
      'Dubai Marina is built around a canal lined by the Marina Walk, with towers rising on both sides and yachts moored below. It is one of the densest residential districts in the city.',
      'Residents walk to cafés, Dubai Marina Mall and the beach at Jumeirah Beach Residence. The Metro and the Dubai Tram both serve the area.',
      'Apartments range from older towers with large layouts to newer buildings with full marina or sea views. View, building age and parking make a real difference here, so compare units one by one.'
    ],
    subcommunities: ['Marina Promenade', 'Marina Gate', 'Emaar Six Towers', 'Dubai Marina Walk', 'Marina Quays', 'Park Island', 'Marina Wharf'],
    landmarks: ['Marina Walk', 'Dubai Marina Mall', 'Pier 7', 'Dubai Marina Yacht Club'],
    suits: ['Young professionals', 'Tenants who want the beach and nightlife nearby', 'Investors in established rental areas']
  },
  {
    slug: 'palm-jumeirah', name: 'Palm Jumeirah', developers: ['nakheel'], types: ['Apartment', 'Villa'],
    wiki: 'Palm_Jumeirah', area: 'Off the Jumeirah coast, reached from Sheikh Zayed Road',
    intro: 'Nakheel’s palm-shaped island, with beachfront villas on the fronds and apartments along the trunk.',
    about: [
      'Palm Jumeirah is one of Dubai’s most recognisable addresses. Villas on the fronds have private beach access, while the trunk carries apartment communities, hotels and Nakheel Mall.',
      'The Crescent is home to resorts including Atlantis The Palm. The Palm Monorail runs along the trunk, and The Pointe and the boardwalk give residents places to walk and eat by the water.',
      'Prices and specifications vary widely between the original Shoreline apartments, the Golden Mile buildings and newer branded residences. We help buyers compare beach access, view and building management.'
    ],
    subcommunities: ['Shoreline Apartments', 'Golden Mile', 'Frond villas', 'Oceana', 'Tiara Residences', 'Marina Residences', 'Garden Homes', 'Signature Villas'],
    landmarks: ['Atlantis The Palm', 'Nakheel Mall', 'The View at The Palm', 'The Pointe', 'Palm Monorail'],
    suits: ['Buyers who want beachfront living', 'Holiday home investors', 'Families looking for large villas by the sea']
  },
  {
    slug: 'business-bay', name: 'Business Bay', developers: ['dubai-properties'], types: ['Apartment'],
    wiki: 'Business_Bay', area: 'Along the Dubai Water Canal, beside Downtown Dubai',
    intro: 'A central district of residential and office towers on the Dubai Water Canal, next to Downtown Dubai.',
    about: [
      'Business Bay grew up along the extension of Dubai Creek and the Dubai Water Canal. Today it mixes offices, hotels and residential towers, many with canal or Burj Khalifa views.',
      'Its position next to Downtown Dubai and Sheikh Zayed Road makes it popular with professionals. Many buildings are newer, and several branded residences have launched here in recent years.',
      'Because the district is large, the experience changes from one end to the other. We look at walkability, the canal frontage and the building itself when comparing Business Bay homes.'
    ],
    subcommunities: ['Bay Avenue', 'Executive Towers', 'Dubai Water Canal frontage', 'Marasi Drive', 'Bay Square'],
    landmarks: ['Dubai Water Canal', 'Bay Avenue', 'Marasi Marina'],
    suits: ['Professionals who want to live near work', 'Investors in central rental apartments', 'Buyers who want Downtown views at a different price point']
  },
  {
    slug: 'jumeirah-village-circle', name: 'Jumeirah Village Circle (JVC)', developers: ['nakheel'], types: ['Apartment', 'Townhouse', 'Villa'],
    wiki: 'Jumeirah_Village', area: 'Between Al Khail Road and Sheikh Mohammed Bin Zayed Road',
    intro: 'A Nakheel community laid out in a circle of districts, with apartment buildings, townhouses and villas.',
    about: [
      'Jumeirah Village Circle is arranged as a ring of numbered districts around a central loop, with parks spread between the buildings. Most homes are mid-rise apartment buildings from many different developers, mixed with townhouses and villas.',
      'It is one of the most active areas for first homes and rental investment because of the range of buildings and price points. Circle Mall serves the community.',
      'Quality varies a great deal between developers and buildings in JVC. We compare construction, service charges and management before shortlisting.'
    ],
    subcommunities: ['District 10', 'District 11', 'District 12', 'District 13', 'District 14', 'District 15', 'District 16', 'District 17', 'District 18'],
    landmarks: ['Circle Mall', 'JVC community parks'],
    suits: ['First-time buyers', 'Rental investors', 'Tenants who want space at a mid-market price']
  },
  {
    slug: 'dubai-creek-harbour', name: 'Dubai Creek Harbour', developers: ['emaar'], types: ['Apartment'],
    wiki: 'Dubai_Creek_Harbour', area: 'On Dubai Creek, beside the Ras Al Khor Wildlife Sanctuary',
    intro: 'An Emaar waterfront community on Dubai Creek, with apartment towers, a marina and Creek Beach.',
    about: [
      'Dubai Creek Harbour is a large Emaar development on the creek, developed with Dubai Holding. It sits next to the Ras Al Khor Wildlife Sanctuary, known for its flamingos.',
      'The community is built in phases of residential towers, with Creek Beach, a marina and waterfront promenades. Many buildings look across the creek towards the Downtown skyline.',
      'Several phases are complete and others are still being released, so the same community includes ready homes and off-plan launches. We help buyers compare both.'
    ],
    subcommunities: ['Creek Beach', 'Creek Island', 'Creek Marina', 'The Lagoons', 'Harbour Gate', 'Creek Rise', 'Harbour Views'],
    landmarks: ['Ras Al Khor Wildlife Sanctuary', 'Creek Beach', 'Dubai Creek Harbour marina'],
    suits: ['Buyers looking at off-plan Emaar apartments', 'Owner-occupiers who want waterfront living', 'Families who want parks and promenades']
  },
  {
    slug: 'arabian-ranches', name: 'Arabian Ranches', developers: ['emaar'], types: ['Villa', 'Townhouse'],
    wiki: 'Arabian_Ranches', area: 'Sheikh Mohammed Bin Zayed Road and Al Qudra Road, Dubailand',
    intro: 'Emaar’s original villa community, with established gardens, a golf club and family neighbourhoods.',
    about: [
      'Arabian Ranches was one of Emaar’s first villa communities and remains a favourite with families. Its neighbourhoods are mature, with tree-lined streets, community pools and parks.',
      'The Arabian Ranches Golf Club sits inside the community and the Dubai Polo & Equestrian Club is next door. Schools and a community centre serve residents day to day.',
      'Because the community is established, most homes are resales. We look at plot size, renovation history and the specific sub-community when comparing villas.'
    ],
    subcommunities: ['Alvorada', 'Saheel', 'Palmera', 'Mirador', 'Savannah', 'Al Reem', 'Alma', 'Hattan', 'Terra Nova', 'Golf Homes', 'Al Mahra', 'Gazelle'],
    landmarks: ['Arabian Ranches Golf Club', 'Dubai Polo & Equestrian Club', 'Arabian Ranches Community Centre'],
    suits: ['Families who want an established villa community', 'Buyers who prefer ready homes with mature gardens']
  },
  {
    slug: 'arabian-ranches-2', name: 'Arabian Ranches 2', developers: ['emaar'], types: ['Villa', 'Townhouse'],
    wiki: 'Arabian_Ranches', area: 'Beside Arabian Ranches, off Sheikh Mohammed Bin Zayed Road',
    intro: 'Emaar’s second Arabian Ranches community of villas and townhouses, including Rasha, Lila, Samara and Azalea.',
    about: [
      'Arabian Ranches 2 continues the family feel of the first Ranches with newer homes and a slightly more contemporary style. Each sub-community has its own pool and park areas.',
      'Al Basel has sold homes in Arabian Ranches 2, including in Rasha and Lila. Villa sizes range from three-bedroom townhouses to large family villas.',
      'We compare the layout, plot, orientation and upgrade work of individual homes, since homes of the same type can differ in value.'
    ],
    subcommunities: ['Rasha', 'Lila', 'Samara', 'Azalea', 'Palma', 'Rosa', 'Yasmin', 'Camelia', 'Reem', 'Casa'],
    landmarks: ['Arabian Ranches 2 community centre', 'Arabian Ranches Golf Club nearby'],
    suits: ['Families upgrading to a villa', 'Buyers who want a newer home in the Ranches area']
  },
  {
    slug: 'arabian-ranches-3', name: 'Arabian Ranches 3', developers: ['emaar'], types: ['Villa', 'Townhouse'],
    wiki: 'Arabian_Ranches', area: 'Sheikh Mohammed Bin Zayed Road, close to Arabian Ranches and Arabian Ranches 2',
    intro: 'The newest Arabian Ranches community by Emaar, with townhouses and villas including the Elie Saab collection.',
    about: [
      'Arabian Ranches 3 brings the Ranches lifestyle to a new generation of homes, from compact townhouses to designer villas. Many phases were sold off-plan and are being handed over in stages.',
      'The community includes the Elie Saab villas, designed with the fashion house, alongside neighbourhoods such as Sun, Joy, Spring, Ruba and Bliss.',
      'Off-plan and ready homes sit side by side here. Ask for the handover status and payment schedule of the exact unit before comparing prices.'
    ],
    subcommunities: ['Sun', 'Joy', 'Spring', 'Ruba', 'Bliss', 'Caya', 'Elie Saab', 'Anya', 'June', 'May', 'Raya'],
    landmarks: ['Arabian Ranches 3 central park', 'Arabian Ranches Golf Club nearby'],
    suits: ['First-time villa buyers', 'Off-plan buyers', 'Families who want a new community']
  },
  {
    slug: 'emaar-beachfront', name: 'Emaar Beachfront', developers: ['emaar'], types: ['Apartment'],
    wiki: 'Dubai_Harbour', area: 'Dubai Harbour, between Palm Jumeirah and Dubai Marina',
    intro: 'An Emaar community of beachfront apartment towers on a private island at Dubai Harbour.',
    about: [
      'Emaar Beachfront sits on its own island at Dubai Harbour, with a private beach for residents and towers facing either Palm Jumeirah or the Dubai Marina skyline.',
      'It is close to Dubai Marina and Jumeirah Beach Residence while feeling separate from the busier streets. Most homes are apartments from one to four bedrooms.',
      'Towers differ by orientation and floor, which changes the sea view. We help buyers compare Palm-facing and Marina-facing units and the phase timing of each tower.'
    ],
    subcommunities: ['Beach Vista', 'Sunrise Bay', 'Marina Vista', 'Grand Bleu Tower', 'Beach Isle', 'Palace Beach Residence', 'Address The Bay', 'Seapoint', 'Bayview'],
    landmarks: ['Emaar Beachfront private beach', 'Dubai Harbour', 'Skydive Dubai nearby'],
    suits: ['Buyers who want beach living with a newer building', 'Holiday home investors']
  },
  {
    slug: 'the-valley', name: 'The Valley', developers: ['emaar'], types: ['Townhouse', 'Villa'],
    wiki: null, area: 'Dubai to Al Ain Road',
    intro: 'An Emaar townhouse and villa community on the Dubai to Al Ain Road, including Orania, Eden and Talia.',
    about: [
      'The Valley is one of Emaar’s communities further out from the city centre, designed around open green spaces, a town centre and family neighbourhoods.',
      'Homes are mainly townhouses and villas, which gives buyers more space than similar budgets closer in. Several phases, including Orania, were launched off-plan.',
      'For off-plan homes here, compare the payment schedule, the handover status and the floor plan of the exact unit.'
    ],
    subcommunities: ['Eden', 'Talia', 'Orania', 'Nara', 'Farm Gardens'],
    landmarks: ['The Valley town centre', 'Dubai to Al Ain Road'],
    suits: ['Families looking for space', 'Off-plan buyers', 'Buyers comfortable with a longer drive into the city']
  },
  {
    slug: 'emaar-south', name: 'Emaar South', developers: ['emaar', 'dubai-south'], types: ['Townhouse', 'Villa', 'Apartment'],
    wiki: 'Dubai_South', area: 'Dubai South, near Al Maktoum International Airport and Expo City Dubai',
    intro: 'An Emaar community in Dubai South with townhouses, villas and apartments around a golf course.',
    about: [
      'Emaar South sits within the wider Dubai South district near Al Maktoum International Airport and Expo City Dubai. The community is built around an 18-hole golf course with parks between the neighbourhoods.',
      'Homes include townhouses, villas and apartments, which makes it one of the more accessible ways to buy into an Emaar community.',
      'Many buyers here think long term about the growth of the Dubai South area. Ask for the current release information and completion status for the exact building.'
    ],
    subcommunities: ['Greenview', 'Golf Links', 'Golf Views', 'Parkside', 'Fairway Villas', 'Urbana', 'Expo Golf Villas'],
    landmarks: ['Emaar South Golf Course', 'Al Maktoum International Airport', 'Expo City Dubai'],
    suits: ['Buyers planning for long-term growth', 'First-time townhouse buyers']
  },
  {
    slug: 'the-oasis', name: 'The Oasis by Emaar', developers: ['emaar'], types: ['Villa'],
    wiki: null, area: 'Dubailand corridor',
    intro: 'An Emaar villa community planned around lagoons and green spaces.',
    about: [
      'The Oasis is one of Emaar’s newer villa communities, planned around water features, parks and wide residential streets.',
      'It focuses on large villas, which makes it a choice for buyers looking for space in a new Emaar community.',
      'Phases have been launched off-plan. Ask for the brochure, floor plans and payment schedule of the exact release before comparing.'
    ],
    subcommunities: ['Palmiera', 'Mirage', 'Lavita'],
    landmarks: ['The Oasis lagoons'],
    suits: ['Families buying large off-plan villas', 'Buyers who want a new Emaar community']
  },
  {
    slug: 'mina-rashid', name: 'Mina Rashid', developers: ['emaar'], types: ['Apartment'],
    wiki: 'Port_Rashid', area: 'Bur Dubai waterfront, near the historic Port Rashid',
    intro: 'A waterfront district at the historic Port Rashid, with Emaar’s Rashid Yachts & Marina homes and the QE2.',
    about: [
      'Mina Rashid is being redeveloped from the historic Port Rashid into a waterfront residential district. The Queen Elizabeth 2 ship is moored here as a hotel.',
      'Emaar develops the Rashid Yachts & Marina homes, with apartment buildings facing the marina and the sea. Seagate and the Fior buildings are part of this area.',
      'Its location close to old Dubai and Jumeirah sets it apart from newer communities further out. Ask about the status of each building, since some are complete and others are new launches.'
    ],
    subcommunities: ['Rashid Yachts & Marina', 'Seagate', 'Fior', 'Clearpoint', 'Sea Breeze'],
    landmarks: ['Queen Elizabeth 2 (QE2)', 'Rashid Yachts & Marina'],
    suits: ['Buyers who want marina living near old Dubai', 'Boat owners']
  },
  {
    slug: 'jumeirah-lake-towers', name: 'Jumeirah Lake Towers (JLT)', developers: ['dmcc'], types: ['Apartment'],
    wiki: 'Jumeirah_Lake_Towers', area: 'Opposite Dubai Marina across Sheikh Zayed Road',
    intro: 'A DMCC district of residential and office towers in lettered clusters around artificial lakes.',
    about: [
      'Jumeirah Lake Towers is a free zone district managed by DMCC. Towers stand in clusters named by letter, set around lakes with walking paths and cafés at street level.',
      'It sits across Sheikh Zayed Road from Dubai Marina and is served by the Dubai Metro, which makes it practical for tenants and professionals.',
      'Buildings vary in age and quality, and some clusters are busier than others. We compare cluster, view and building management when shortlisting.'
    ],
    subcommunities: ['Cluster A', 'Cluster C', 'Cluster D', 'Cluster I', 'Cluster J', 'Cluster O', 'Cluster T', 'Cluster X', 'Cluster Y'],
    landmarks: ['JLT lakes and parks', 'DMCC Metro Station'],
    suits: ['Tenants who want value near the Marina', 'Professionals working in the DMCC free zone', 'Rental investors']
  },
  {
    slug: 'jumeirah-beach-residence', name: 'Jumeirah Beach Residence (JBR)', developers: ['dubai-properties'], types: ['Apartment'],
    wiki: 'Jumeirah_Beach_Residence', area: 'On the Jumeirah coast beside Dubai Marina',
    intro: 'A beachfront apartment community with The Walk and The Beach, developed by Dubai Properties.',
    about: [
      'Jumeirah Beach Residence is a line of residential towers directly on the beach next to Dubai Marina. The Walk and The Beach bring restaurants, shops and events to the doorstep.',
      'It faces Bluewaters Island and Ain Dubai across the water and is served by the Dubai Tram.',
      'JBR is popular with tenants and holiday home guests. We compare sea views, tower position and building management when looking at units.'
    ],
    subcommunities: ['Murjan', 'Sadaf', 'Bahar', 'Rimal', 'Amwaj', 'Shams'],
    landmarks: ['The Walk', 'The Beach at JBR', 'Ain Dubai nearby'],
    suits: ['Beach lovers', 'Holiday home investors', 'Tenants who want an active neighbourhood']
  },
  {
    slug: 'bluewaters-island', name: 'Bluewaters Island', developers: ['meraas'], types: ['Apartment'],
    wiki: 'Bluewaters_Island', area: 'Off the JBR coast',
    intro: 'A Meraas island off JBR with apartments, hotels and Ain Dubai.',
    about: [
      'Bluewaters Island is a compact island destination by Meraas, connected to JBR and Sheikh Zayed Road. It is home to Ain Dubai, a giant observation wheel.',
      'The residential buildings sit among restaurants and hotels, with views over the sea, JBR and Dubai Marina.',
      'With a limited number of residences, units here are relatively scarce. Ask us about current availability.'
    ],
    subcommunities: ['Bluewaters Residences', 'Bluewaters Bay'],
    landmarks: ['Ain Dubai', 'The Wharf'],
    suits: ['Buyers who want a distinctive island address', 'Holiday home investors']
  },
  {
    slug: 'city-walk', name: 'City Walk', developers: ['meraas'], types: ['Apartment'],
    wiki: 'City_Walk_(Dubai)', area: 'Al Wasl, between Downtown Dubai and Jumeirah',
    intro: 'A Meraas lifestyle district in Al Wasl with apartments above streets of shops and restaurants.',
    about: [
      'City Walk is an open-air district by Meraas, designed for walking. Residential buildings sit above streets of shops, restaurants and the Coca-Cola Arena.',
      'Its location between Downtown Dubai and Jumeirah makes it central for work and leisure.',
      'Homes are apartments in a limited number of buildings. Compare layout, outlook and parking for the exact unit.'
    ],
    subcommunities: ['City Walk residential buildings', 'Central Park at City Walk'],
    landmarks: ['Coca-Cola Arena', 'City Walk retail streets'],
    suits: ['Buyers who want a central, walkable neighbourhood', 'Professionals']
  },
  {
    slug: 'jumeirah-golf-estates', name: 'Jumeirah Golf Estates', developers: ['jumeirah-golf-estates'], types: ['Villa', 'Townhouse', 'Apartment'],
    wiki: 'Jumeirah_Golf_Estates', area: 'Sheikh Mohammed Bin Zayed Road',
    intro: 'A golf community with the Earth and Fire courses, home of the DP World Tour Championship.',
    about: [
      'Jumeirah Golf Estates is built around two championship golf courses, Earth and Fire. The Earth course hosts the DP World Tour Championship.',
      'Villas line the fairways in quiet neighbourhoods, while newer phases add townhouses and apartments.',
      'Golf frontage, plot size and the sub-community make a large difference to value. We compare these for each home.'
    ],
    subcommunities: ['Lime Tree Valley', 'Redwood Park', 'Sienna Lakes', 'Wildflower', 'Whispering Pines', 'Fire Residences', 'Alandalus', 'Orange Lake'],
    landmarks: ['Earth course', 'Fire course', 'Jumeirah Golf Estates clubhouse'],
    suits: ['Golfers', 'Families who want a quiet villa community']
  },
  {
    slug: 'damac-hills', name: 'DAMAC Hills', developers: ['damac'], types: ['Villa', 'Townhouse', 'Apartment'],
    wiki: 'Damac_Hills', area: 'Al Qudra Road and Sheikh Mohammed Bin Zayed Road, Dubailand',
    intro: 'A DAMAC golf community with villas, townhouses and apartments around Trump International Golf Club Dubai.',
    about: [
      'DAMAC Hills is a master community built around the Trump International Golf Club Dubai. It mixes villas and townhouses with apartment buildings and community facilities.',
      'Residents have parks, sports facilities and schools within the community.',
      'Homes vary from apartments to large golf-view villas. We compare the cluster, view and building or villa type.'
    ],
    subcommunities: ['Golf Promenade', 'Brookfield', 'Richmond', 'The Trump Estates', 'Carson', 'Loreto', 'Bellavista'],
    landmarks: ['Trump International Golf Club Dubai', 'DAMAC Hills central park'],
    suits: ['Families', 'Golf lovers', 'Buyers wanting a choice of villa or apartment']
  },
  {
    slug: 'damac-hills-2', name: 'DAMAC Hills 2', developers: ['damac'], types: ['Villa', 'Townhouse'],
    wiki: null, area: 'Dubailand, off Sheikh Mohammed Bin Zayed Road and the Dubai to Al Ain Road',
    intro: 'A DAMAC villa and townhouse community further into Dubailand, formerly known as AKOYA Oxygen.',
    about: [
      'DAMAC Hills 2 is a large villa and townhouse community further out in Dubailand. It was previously known as AKOYA Oxygen.',
      'It offers more space for the budget than central communities, with parks and leisure facilities inside.',
      'Ask about the cluster, the home’s condition and the service charge when comparing.'
    ],
    subcommunities: ['Amazonia', 'Aknan', 'Basswood', 'Odora', 'Pacifica', 'Victoria', 'Vardon'],
    landmarks: ['DAMAC Hills 2 water park', 'Community parks'],
    suits: ['Budget-conscious villa buyers', 'Families who want space']
  },
  {
    slug: 'damac-lagoons', name: 'DAMAC Lagoons', developers: ['damac'], types: ['Townhouse', 'Villa'],
    wiki: null, area: 'Hessa Street extension, Dubailand',
    intro: 'A DAMAC townhouse and villa community built around lagoons, with clusters named after Mediterranean destinations.',
    about: [
      'DAMAC Lagoons is planned around lagoons and beaches, with each cluster themed after a Mediterranean destination such as Santorini, Costa Brava, Portofino and Venice.',
      'Homes are mainly townhouses and villas sold off-plan in phases.',
      'For off-plan clusters, compare the payment schedule and handover timing of the exact phase.'
    ],
    subcommunities: ['Santorini', 'Costa Brava', 'Portofino', 'Venice', 'Malta', 'Nice', 'Morocco'],
    landmarks: ['DAMAC Lagoons lagoons and beaches'],
    suits: ['Off-plan buyers', 'Families who want a themed resort-style community']
  },
  {
    slug: 'sobha-hartland', name: 'Sobha Hartland', developers: ['sobha'], types: ['Apartment', 'Villa', 'Townhouse'],
    wiki: null, area: 'Mohammed Bin Rashid City, near Ras Al Khor and Dubai Water Canal',
    intro: 'A Sobha Realty community in Mohammed Bin Rashid City with apartments, villas and international schools.',
    about: [
      'Sobha Hartland is a green community in Mohammed Bin Rashid City, close to Downtown Dubai and Business Bay. It mixes apartment towers with villas and townhouses.',
      'Hartland International School is inside the community, which makes it popular with families.',
      'Sobha builds and finishes its homes itself. Compare the tower, floor and view of each unit, and whether it is in the original Hartland or Sobha Hartland 2.'
    ],
    subcommunities: ['Hartland Greens', 'Sobha Creek Vistas', 'Hartland Garden Apartments', 'Waves', 'One Park Avenue', 'Sobha Hartland II'],
    landmarks: ['Hartland International School', 'Ras Al Khor Wildlife Sanctuary nearby'],
    suits: ['Families', 'Buyers who want central access with green space']
  },
  {
    slug: 'district-one', name: 'District One (Meydan)', developers: ['meydan', 'sobha'], types: ['Villa', 'Apartment'],
    wiki: null, area: 'Mohammed Bin Rashid City, near Meydan',
    intro: 'A villa community in Mohammed Bin Rashid City built around a large crystal lagoon.',
    about: [
      'District One is a low-density villa community in Mohammed Bin Rashid City, developed by Meydan with Sobha. Its central feature is a large crystal lagoon with beaches.',
      'Large contemporary villas face the lagoon or green spaces, with newer apartment phases nearby.',
      'Homes here are high-value and vary in plot and finish. We compare the lagoon frontage and specification of each villa.'
    ],
    subcommunities: ['District One Villas', 'District One Residences', 'Meydan Avenue'],
    landmarks: ['District One crystal lagoon', 'Meydan Racecourse nearby'],
    suits: ['Buyers of large luxury villas', 'Families who want central access']
  },
  {
    slug: 'tilal-al-ghaf', name: 'Tilal Al Ghaf', developers: ['majid-al-futtaim'], types: ['Villa', 'Townhouse'],
    wiki: null, area: 'Hessa Street, near Arabian Ranches and Al Barsha South',
    intro: 'A Majid Al Futtaim villa and townhouse community around a swimmable lagoon.',
    about: [
      'Tilal Al Ghaf is a family community by Majid Al Futtaim, the group behind Mall of the Emirates. Its centrepiece is Lagoon Al Ghaf, with a sandy beach for residents.',
      'Homes are townhouses and villas in neighbourhoods such as Harmony, Serenity, Elan and Aura.',
      'Several neighbourhoods were sold off-plan. Ask for the handover status of the exact home.'
    ],
    subcommunities: ['Harmony', 'Serenity', 'Elan', 'Aura', 'Alaya'],
    landmarks: ['Lagoon Al Ghaf'],
    suits: ['Families', 'Buyers who want a new lagoon community']
  },
  {
    slug: 'jumeirah-village-triangle', name: 'Jumeirah Village Triangle (JVT)', developers: ['nakheel'], types: ['Villa', 'Townhouse', 'Apartment'],
    wiki: 'Jumeirah_Village', area: 'Beside Jumeirah Village Circle, off Sheikh Mohammed Bin Zayed Road',
    intro: 'A Nakheel community of villas, townhouses and apartments next to JVC.',
    about: [
      'Jumeirah Village Triangle sits next to Jumeirah Village Circle and has a quieter feel, with more villas and townhouses arranged in districts.',
      'Apartment buildings sit around its edges, while the inner districts are mostly family homes.',
      'Compare the district and the condition of each villa, since homes range from original builds to renovated properties.'
    ],
    subcommunities: ['District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 7', 'District 8', 'District 9'],
    landmarks: ['JVT community parks'],
    suits: ['Families who want a villa at a mid-market price', 'Rental investors']
  },
  {
    slug: 'dubai-sports-city', name: 'Dubai Sports City', developers: ['dubai-sports-city'], types: ['Apartment', 'Villa'],
    wiki: 'Dubai_Sports_City', area: 'Sheikh Mohammed Bin Zayed Road, near Motor City',
    intro: 'A sports-themed community with apartments, the Victory Heights villas, a cricket stadium and The Els Club.',
    about: [
      'Dubai Sports City combines homes with sports venues, including the Dubai International Cricket Stadium and The Els Club golf course.',
      'Most homes are apartments, while Victory Heights offers villas around the golf course.',
      'It is popular with tenants and buyers looking for value. Compare buildings carefully, since quality varies.'
    ],
    subcommunities: ['Victory Heights', 'Canal Residence', 'The Matrix', 'Golf View Residence', 'Elite Sports Residence'],
    landmarks: ['Dubai International Cricket Stadium', 'The Els Club'],
    suits: ['Budget-conscious buyers', 'Sports lovers', 'Rental investors']
  },
  {
    slug: 'motor-city', name: 'Motor City', developers: ['union-properties'], types: ['Apartment', 'Villa', 'Townhouse'],
    wiki: 'Motor_City_(Dubai)', area: 'Sheikh Mohammed Bin Zayed Road, beside Dubai Sports City',
    intro: 'A Union Properties community with apartments, Green Community villas and the Dubai Autodrome.',
    about: [
      'Motor City is a motorsport-themed community by Union Properties, home to the Dubai Autodrome.',
      'Uptown Motor City offers apartments around a central park, while Green Community Motor City has villas and townhouses.',
      'It is established and popular with families and tenants. Compare the building or villa cluster.'
    ],
    subcommunities: ['Uptown Motor City', 'Green Community Motor City', 'Dubai Autodrome'],
    landmarks: ['Dubai Autodrome', 'First Avenue Mall'],
    suits: ['Families', 'Tenants looking for value']
  },
  {
    slug: 'dubai-silicon-oasis', name: 'Dubai Silicon Oasis', developers: ['dubai-silicon-oasis'], types: ['Apartment', 'Townhouse', 'Villa'],
    wiki: 'Dubai_Silicon_Oasis', area: 'Between the Dubai to Al Ain Road and Sheikh Mohammed Bin Zayed Road',
    intro: 'A technology park and free zone with residential districts of apartments, townhouses and villas.',
    about: [
      'Dubai Silicon Oasis is a technology park and free zone that also has residential districts with apartments, townhouses and villas.',
      'It suits people working in the area or along the eastern side of the city.',
      'Compare buildings and the specific residential district before deciding.'
    ],
    subcommunities: ['Cedre Villas', 'Silicon Gates', 'Le Presidium', 'Axis Residence'],
    landmarks: ['Silicon Central mall', 'Dubai Silicon Oasis technology park'],
    suits: ['Tenants looking for value', 'Professionals working nearby']
  },
  {
    slug: 'al-furjan', name: 'Al Furjan', developers: ['nakheel'], types: ['Villa', 'Townhouse', 'Apartment'],
    wiki: null, area: 'Sheikh Mohammed Bin Zayed Road, near Discovery Gardens',
    intro: 'A Nakheel community of villas, townhouses and apartments with a Metro station on Route 2020.',
    about: [
      'Al Furjan is a Nakheel community with villa and townhouse clusters and a growing number of apartment buildings.',
      'The Al Furjan Metro Station on the Route 2020 line connects the community to the Dubai Metro.',
      'Compare cluster and building, since the community includes both established and newer homes.'
    ],
    subcommunities: ['Quortaj', 'Dubai Style', 'Masakin', 'Al Furjan West'],
    landmarks: ['Al Furjan Metro Station', 'Al Furjan Pavilion'],
    suits: ['Families', 'Rental investors']
  },
  {
    slug: 'emirates-living', name: 'Emirates Living (The Springs, The Meadows, The Lakes)', developers: ['emaar'], types: ['Villa', 'Townhouse'],
    wiki: 'Emirates_Hills', area: 'Sheikh Zayed Road side of Al Barsha and Jumeirah Lake Towers',
    intro: 'Emaar’s established villa districts: The Springs, The Meadows, The Lakes and Emirates Hills.',
    about: [
      'Emirates Living is the umbrella name for Emaar’s established villa communities near Jumeirah Lake Towers: The Springs, The Meadows, The Lakes and the prestigious Emirates Hills.',
      'Mature gardens, lakes and community pools make these neighbourhoods popular with families who want to be close to the Marina and Al Barsha.',
      'Most homes are resales. Plot size, lake view and renovation history matter more than the original specification.'
    ],
    subcommunities: ['The Springs', 'The Meadows', 'The Lakes', 'Emirates Hills'],
    landmarks: ['Emirates Golf Club', 'Montgomerie Golf Club'],
    suits: ['Families who want an established villa near the Marina', 'Luxury buyers in Emirates Hills']
  },
  {
    slug: 'the-greens-and-views', name: 'The Greens and The Views', developers: ['emaar'], types: ['Apartment'],
    wiki: null, area: 'Next to Emirates Golf Club, off Sheikh Zayed Road',
    intro: 'Emaar apartment communities beside Emirates Golf Club.',
    about: [
      'The Greens and The Views are low and mid-rise Emaar apartment communities next to Emirates Golf Club.',
      'Their gardens, pools and golf views make them popular with tenants and buyers who want calm close to the Marina and Media City.',
      'Compare the building, the view and the layout, since units of the same size can differ in outlook.'
    ],
    subcommunities: ['The Greens', 'The Views', 'Golf Tower', 'Mosela', 'Panorama'],
    landmarks: ['Emirates Golf Club', 'The Greens Souk'],
    suits: ['Tenants', 'First-time buyers', 'Professionals working in Media City or Internet City']
  },
  {
    slug: 'dubai-festival-city', name: 'Dubai Festival City', developers: ['al-futtaim'], types: ['Villa', 'Apartment'],
    wiki: 'Dubai_Festival_City', area: 'On Dubai Creek, opposite Al Jaddaf and Dubai Creek Harbour',
    intro: 'An Al-Futtaim creekside community with villas, apartments, hotels and Dubai Festival City Mall.',
    about: [
      'Dubai Festival City is a creekside community by Al-Futtaim, combining villas, apartments, hotels and Dubai Festival City Mall.',
      'Its villa district, Al Badia, sits around a golf course, while apartments overlook the creek.',
      'It is close to Dubai International Airport and the older parts of the city.'
    ],
    subcommunities: ['Al Badia', 'Marsa Plaza', 'Festival Waterfront Centre'],
    landmarks: ['Dubai Festival City Mall', 'Al Badia Golf Club'],
    suits: ['Families who want to be near the airport', 'Buyers who want creek views']
  },
  {
    slug: 'town-square', name: 'Town Square Dubai', developers: ['nshama'], types: ['Apartment', 'Townhouse'],
    wiki: null, area: 'Al Qudra Road',
    intro: 'A Nshama community of apartments and townhouses on Al Qudra Road.',
    about: [
      'Town Square Dubai is a large Nshama community designed around a central park, with apartments and townhouses.',
      'It is popular with first-time buyers and young families looking for space at an accessible price.',
      'Compare the phase and the building, since the community was delivered in stages.'
    ],
    subcommunities: ['Zahra', 'Hayat', 'Safi', 'Noor', 'Jenna', 'Naseem', 'Rawda', 'UNA'],
    landmarks: ['Town Square Park'],
    suits: ['First-time buyers', 'Young families']
  },
  {
    slug: 'mudon', name: 'Mudon', developers: ['dubai-properties'], types: ['Villa', 'Townhouse'],
    wiki: null, area: 'Dubailand, off Sheikh Mohammed Bin Zayed Road',
    intro: 'A Dubai Properties villa and townhouse community in Dubailand.',
    about: [
      'Mudon is a family community of villas and townhouses by Dubai Properties, with parks, cycling tracks and community facilities.',
      'It is close to Arabian Ranches and Al Qudra Road.',
      'Compare the phase and plot when looking at homes here.'
    ],
    subcommunities: ['Arabella', 'Rahat', 'Naseem', 'Mudon Views', 'Al Salam'],
    landmarks: ['Mudon central park'],
    suits: ['Families', 'Buyers looking for a townhouse']
  },
  {
    slug: 'jumeirah-islands', name: 'Jumeirah Islands', developers: ['nakheel'], types: ['Villa'],
    wiki: 'Jumeirah_Islands', area: 'Next to Jumeirah Lake Towers and Emirates Hills',
    intro: 'A Nakheel villa community on clusters of islands surrounded by lakes.',
    about: [
      'Jumeirah Islands is a villa community of island clusters, each surrounded by water and connected by bridges.',
      'Large villas with private gardens and lake views make it a favourite with families who want privacy close to the Marina.',
      'Many homes have been extended or renovated, so compare each villa individually.'
    ],
    subcommunities: ['Mediterranean cluster', 'Oasis cluster', 'Islamic cluster', 'Asian cluster'],
    landmarks: ['Jumeirah Islands Pavilion', 'Jumeirah Islands lakes'],
    suits: ['Families who want privacy and space', 'Luxury villa buyers']
  },
  {
    slug: 'jumeirah-park', name: 'Jumeirah Park', developers: ['nakheel'], types: ['Villa'],
    wiki: null, area: 'Next to Jumeirah Islands and Discovery Gardens',
    intro: 'A Nakheel villa community of family homes in districts.',
    about: [
      'Jumeirah Park is a Nakheel villa community with three, four and five bedroom homes arranged in districts with parks.',
      'Its position near Jumeirah Islands and JLT makes it practical for families who want a villa close to the Marina.',
      'Compare the villa style, the plot and the district when looking at homes.'
    ],
    subcommunities: ['District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6', 'District 7', 'District 8', 'District 9'],
    landmarks: ['Jumeirah Park Pavilion'],
    suits: ['Families', 'Buyers upgrading to a villa']
  },
  {
    slug: 'al-barsha', name: 'Al Barsha', developers: [], types: ['Apartment', 'Villa'],
    wiki: 'Al_Barsha', area: 'Behind Mall of the Emirates, off Sheikh Zayed Road',
    intro: 'An established Dubai district behind Mall of the Emirates with apartments and villas.',
    about: [
      'Al Barsha is an established district built around Mall of the Emirates, with apartment buildings, villas and many schools.',
      'Its central position between Sheikh Zayed Road and Al Khail Road gives easy access across the city, and the Metro serves the Sheikh Zayed Road side.',
      'Homes vary from older villas to newer apartment buildings. Compare the building and its parking and management.'
    ],
    subcommunities: ['Al Barsha 1', 'Al Barsha 2', 'Al Barsha 3', 'Al Barsha South', 'Barsha Heights'],
    landmarks: ['Mall of the Emirates', 'Al Barsha Pond Park'],
    suits: ['Families who want schools nearby', 'Tenants who want a central location']
  },
  {
    slug: 'dubai-south', name: 'Dubai South', developers: ['dubai-south'], types: ['Apartment', 'Townhouse', 'Villa'],
    wiki: 'Dubai_South', area: 'Around Al Maktoum International Airport and Expo City Dubai',
    intro: 'A master-planned district around Al Maktoum International Airport and Expo City Dubai.',
    about: [
      'Dubai South is a large planned district around Al Maktoum International Airport, with residential, logistics and business areas. Expo City Dubai is part of the wider area.',
      'Its residential districts offer apartments, townhouses and villas, including Emaar South.',
      'Buyers here usually think long term about the growth of the area. Ask about the status of the exact building.'
    ],
    subcommunities: ['The Pulse', 'Emaar South', 'Residential District', 'South Bay'],
    landmarks: ['Al Maktoum International Airport', 'Expo City Dubai'],
    suits: ['Long-term investors', 'Buyers working near the airport or Expo City']
  },
  {
    slug: 'dubai-maritime-city', name: 'Dubai Maritime City', developers: [], types: ['Apartment'],
    wiki: 'Dubai_Maritime_City', area: 'A peninsula between Port Rashid and the Dubai Drydocks, Bur Dubai',
    intro: 'A waterfront peninsula next to Port Rashid, now home to new apartment projects including Deyaar’s Mar Casa.',
    about: [
      'Dubai Maritime City is a peninsula on the Bur Dubai coast, between Port Rashid and the Dubai Drydocks. It was planned as a maritime business district and now also has new residential projects.',
      'Its position close to Mina Rashid, Jumeirah and old Dubai appeals to buyers who want a sea-facing apartment near the historic centre.',
      'Most residential projects here are recent launches. Ask for the completion status and payment schedule of the exact building.'
    ],
    subcommunities: ['Mar Casa', 'Dubai Maritime City waterfront'],
    landmarks: ['Port Rashid', 'Dubai Drydocks', 'Mina Rashid nearby'],
    suits: ['Off-plan apartment buyers', 'Buyers who want sea views near old Dubai']
  },
  {
    slug: 'dubai-production-city', name: 'Dubai Production City (IMPZ)', developers: [], types: ['Apartment'],
    wiki: 'Dubai_Production_City', area: 'Sheikh Mohammed Bin Zayed Road, near Sports City and Motor City',
    intro: 'A media and production business district, formerly known as IMPZ, with apartment communities such as Deyaar’s Jannat Midtown.',
    about: [
      'Dubai Production City, formerly known as the International Media Production Zone (IMPZ), is a business district for media and production companies with residential apartment buildings.',
      'It sits off Sheikh Mohammed Bin Zayed Road near Dubai Sports City and Motor City, which makes it a value choice for tenants and first-time buyers.',
      'Compare the building, its facilities and the service charge when shortlisting.'
    ],
    subcommunities: ['Jannat Midtown', 'Lakeside', 'Centrium Towers', 'Oakwood Residency'],
    landmarks: ['Dubai Production City business district'],
    suits: ['First-time buyers', 'Tenants looking for value', 'Professionals working in media']
  },
  {
    slug: 'grand-polo-club-and-resort', name: 'Grand Polo Club & Resort', developers: ['emaar'], types: ['Villa'],
    wiki: null, area: 'Near Al Maktoum International Airport (Emaar describes it as about five minutes away)',
    intro: 'Emaar’s equestrian-inspired villa community, with three to five bedroom villas around a polo club estate.',
    about: [
      'Grand Polo Club & Resort is one of Emaar’s newest master communities, built around an equestrian theme. Emaar describes it as about five minutes from Al Maktoum International Airport.',
      'Homes are villas of three to five bedrooms in neighbourhoods such as Chevalia Estate, Chevalia Fields, Equestra, Equiterra, Montura and Selvara. Residents have access to the Grand Polo Club Estate, community centres, padel and football courts, mini golf, a forest walk and a dog park.',
      'The community is being released in phases off-plan. Ask us for the brochure, floor plans and payment schedule of the exact release.'
    ],
    subcommunities: ['Chevalia Estate', 'Chevalia Fields', 'Equestra', 'Equiterra', 'Montura', 'Selvara'],
    landmarks: ['Grand Polo Club Estate', 'Al Maktoum International Airport', 'Galloping Fountain and Floral Gardens'],
    suits: ['Families buying large off-plan villas', 'Riders and lovers of the outdoors', 'Long-term buyers in Dubai South']
  }
];
