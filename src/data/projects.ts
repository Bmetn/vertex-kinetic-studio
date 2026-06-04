export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: number;
  dimensions: string;
  material: string;
  description: string;
  image: string;
  status: 'completed' | 'in-progress' | 'concept';
}

export const projects: Project[] = [
  {
    id: 'void-pavilion',
    title: 'VOID PAVILION',
    category: 'Public Installation',
    location: 'Tokyo, JP',
    year: 2025,
    dimensions: '24m × 18m × 32m',
    material: 'Reinforced Ferroconcrete / Carbon Fiber',
    description: 'A cantilevered monolith that defies conventional gravity with a 16-meter unsupported overhang. Internal void spaces create natural ventilation corridors.',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80',
    status: 'completed',
  },
  {
    id: 'kinetic-tower',
    title: 'KINETIC TOWER Ξ',
    category: 'Mixed-Use Highrise',
    location: 'Dubai, UAE',
    year: 2026,
    dimensions: '180m × 42m × 42m',
    material: 'Ultra-High Performance Concrete / Titanium Mesh',
    description: 'A rotating residential tower with each floor independently pivoting 1.2° per hour. Kinetic façade panels harvest wind energy.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    status: 'in-progress',
  },
  {
    id: 'anti-gravity-bridge',
    title: 'ANTIGRAVITY BRIDGE',
    category: 'Infrastructure',
    location: 'Oslo, NO',
    year: 2024,
    dimensions: '340m span × 8m deck',
    material: 'Weathering Steel / Basalt Fiber Concrete',
    description: 'A tensegrity pedestrian bridge with no visible supports. Magnetic levitation nodes embedded in the deck create a floating sensation.',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80',
    status: 'completed',
  },
  {
    id: 'monolith-museum',
    title: 'MONOLITH MUSEUM',
    category: 'Cultural Center',
    location: 'Berlin, DE',
    year: 2025,
    dimensions: '86m × 54m × 28m',
    material: 'Exposed Aggregate Concrete / Cor-Ten Steel',
    description: 'A brutalist cultural complex carved from a single concrete mass. Interior atriums are illuminated by precision-cut light wells that track solar movement.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    status: 'completed',
  },
  {
    id: 'floating-hab',
    title: 'FLOATING HAB ◊',
    category: 'Residential Module',
    location: 'Reykjavik, IS',
    year: 2026,
    dimensions: '12m × 12m × 8m',
    material: 'Cross-Laminated Timber / Aerogel Insulation',
    description: 'A self-sustaining modular dwelling designed for extreme climates. Geothermal coupling and phase-change materials maintain constant interior temperature.',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',
    status: 'concept',
  },
  {
    id: 'nexus-terminal',
    title: 'NEXUS TERMINAL',
    category: 'Transportation Hub',
    location: 'Singapore, SG',
    year: 2025,
    dimensions: '220m × 180m × 45m',
    material: 'ETFE Membrane / Structural Glass / Steel',
    description: 'An intermodal transit hub where parametric roof geometry channels rainwater into collection systems. The structure breathes through adaptive louvres.',
    image: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?w=800&q=80',
    status: 'in-progress',
  },
];

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export const principles: Principle[] = [
  {
    number: '01',
    title: 'STRUCTURAL HONESTY',
    description: 'Every element serves a purpose. We expose the skeleton, celebrate the joint, and let material speak its truth without decorative artifice.',
  },
  {
    number: '02',
    title: 'KINETIC ADAPTATION',
    description: 'Buildings must breathe, pivot, and respond. Our structures are not static monuments but living machines calibrated to environmental forces.',
  },
  {
    number: '03',
    title: 'ZERO-GRAVITY THINKING',
    description: 'We design as if gravity is optional. Cantilevered masses, tensegrity networks, and magnetic suspensions challenge the eye and defy expectation.',
  },
  {
    number: '04',
    title: 'MATERIAL BRUTALITY',
    description: 'Raw concrete, weathering steel, carbon fiber — we select materials for their elemental strength and let age and patina become design features.',
  },
];

export interface TeamMember {
  name: string;
  role: string;
  location: string;
}

export const team: TeamMember[] = [
  { name: 'Kaito Voss', role: 'Founding Principal', location: 'Tokyo' },
  { name: 'Elara Sundström', role: 'Design Director', location: 'Stockholm' },
  { name: 'Rylan Chen', role: 'Structural Lead', location: 'Singapore' },
  { name: 'Nyx Petrov', role: 'Computational Designer', location: 'Berlin' },
  { name: 'Orion Malik', role: 'Material Researcher', location: 'Dubai' },
  { name: 'Zephyr Tanaka', role: 'Kinetic Systems Engineer', location: 'Oslo' },
];

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'WORK', href: '/work' },
  { label: 'STUDIO', href: '/studio' },
  { label: 'PROCESS', href: '/process' },
  { label: 'CONTACT', href: '/contact' },
];
