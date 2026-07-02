import type { Part } from "@/types";

function makePart(overrides: Partial<Part>): Part {
  const id = crypto.randomUUID();
  return {
    id,
    slug: overrides.name?.toLowerCase().replace(/\s+/g, "-") ?? id,
    createdAt: "2025-01-01",
    updatedAt: "2025-06-01",
    viewCount: Math.floor(Math.random() * 5000),
    featured: false,
    images: [],
    specifications: [],
    compatibility: [],
    tags: [],
    ...overrides,
  } as Part;
}

export const mockParts: Part[] = [
  makePart({
    name: "Crankshaft Bearing Set",
    partNumber: "CB-8872-STD",
    oemNumbers: ["23100-26030", "23100-26031"],
    brand: "Nippon Bearings",
    category: "engine",
    subcategory: "Bearings",
    shortDescription: "Standard size main and rod bearing set for 4-cylinder diesel engines.",
    description:
      "Precision-ground bearing set manufactured from tri-metal aluminum alloy. Each bearing is individually inspected for wall thickness tolerance within 0.003mm. Suitable for engines requiring SAE 15W-40 or 20W-50 oil grades.\n\n**Features:**\n- Tri-metal construction (steel backing + copper-lead interlayer + aluminum overlay)\n- Electroplated tin flash for anti-corrosion during storage\n- Grooved and ungrooved halves included\n\n**Installation Notes:**\n- Always measure journal diameters before installation\n- Apply assembly lube to bearing surfaces\n- Torque main cap bolts to manufacturer specifications",
    stockStatus: "in_stock",
    specifications: [
      { label: "Material", value: "Tri-metal Aluminum Alloy", unit: "" },
      { label: "Wall Thickness", value: "2.0", unit: "mm" },
      { label: "Journal Diameter", value: "53.0", unit: "mm" },
      { label: "Weight", value: "1.2", unit: "kg" },
    ],
    compatibility: [
      { make: "Toyota", model: "Land Cruiser 70", yearFrom: 2007, yearTo: 2023, engineCode: "1VD-FTV" },
      { make: "Nissan", model: "Patrol Y61", yearFrom: 2010, yearTo: 2021, engineCode: "ZD30DDTi" },
      { make: "Mitsubishi", model: "Canter", yearFrom: 2012, yearTo: 2022, engineCode: "4M50" },
    ],
    images: [{ url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80", alt: "Crankshaft Bearing Set", isPrimary: true }],
    tags: ["bearing", "crankshaft", "diesel", "engine-internals"],
    featured: true,
  }),

  makePart({
    name: "Ceramic Brake Pad Set",
    partNumber: "BP-CRM-421",
    oemNumbers: ["04465-33290", "04465-33300"],
    brand: "FrictiON Tech",
    category: "brakes",
    subcategory: "Brake Pads",
    shortDescription: "Low-dust ceramic brake pads with shims for quiet operation.",
    description:
      "High-performance ceramic brake pad set engineered for fleet vehicles operating in urban and highway conditions. Formulated with aramid fibers and ceramic particles to deliver consistent friction across a wide temperature range.\n\n**Key Specifications:**\n- Friction coefficient: 0.38–0.42\n- Max operating temperature: 650°C\n- Shear strength: 4.5 MPa minimum\n\nIncludes stainless steel shims and wear indicator clips.",
    stockStatus: "in_stock",
    specifications: [
      { label: "Material", value: "Ceramic + Aramid Fiber", unit: "" },
      { label: "Friction Coefficient", value: "0.38-0.42", unit: "μ" },
      { label: "Max Temperature", value: "650", unit: "°C" },
      { label: "Thickness", value: "17.5", unit: "mm" },
    ],
    compatibility: [
      { make: "Toyota", model: "Hilux", yearFrom: 2015, yearTo: 2024, engineCode: "2GD-FTV" },
      { make: "Toyota", model: "Fortuner", yearFrom: 2016, yearTo: 2024, engineCode: "1GD-FTV" },
      { make: "Isuzu", model: "D-Max", yearFrom: 2020, yearTo: 2024, engineCode: "RZ4E" },
    ],
    images: [{ url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80", alt: "Ceramic Brake Pad Set", isPrimary: true }],
    tags: ["brake-pads", "ceramic", "low-dust"],
    featured: true,
  }),

  makePart({
    name: "Heavy Duty Brake Drum",
    partNumber: "BD-HD-670R",
    oemNumbers: ["43512-60030", "43512-60031"],
    brand: "DrumPro",
    category: "brakes",
    subcategory: "Brake Drums",
    shortDescription: "Heat-treated cast iron brake drum for medium-duty trucks.",
    description:
      "Centrifugally cast brake drum with integrally cast cooling fins. Heat-treated to relieve residual casting stresses. Precision-machined braking surface ensures minimal run-out and eliminates pedal pulsation.\n\n**Technical Data:**\n- Material: G3000 grey iron\n- Tensile strength: 210 MPa\n- Drum diameter: 310 mm\n- Max refinish diameter: 312 mm",
    stockStatus: "low_stock",
    stockNote: "Expected restock: 2 weeks",
    specifications: [
      { label: "Material", value: "G3000 Grey Iron", unit: "" },
      { label: "Diameter", value: "310", unit: "mm" },
      { label: "Max Refinish", value: "312", unit: "mm" },
      { label: "Weight", value: "18.5", unit: "kg" },
    ],
    compatibility: [
      { make: "Hino", model: "300 Series", yearFrom: 2010, yearTo: 2020 },
      { make: "Mitsubishi", model: "Canter FE", yearFrom: 2012, yearTo: 2022 },
    ],
    tags: ["drum", "brake", "truck", "heavy-duty"],
  }),

  makePart({
    name: "Alternator 150A",
    partNumber: "ALT-150-24V",
    oemNumbers: ["27060-0C030", "27060-0C040"],
    brand: "Denso",
    category: "electrical",
    subcategory: "Alternators",
    shortDescription: "24V 150A alternator for commercial vehicle applications.",
    description:
      "Heavy-duty 24-volt alternator delivering 150 amps of output current. Features sealed bearings, integrated voltage regulator, and multi-groove pulley. Designed for continuous high-load operation in fleet service.\n\n**Output Ratings:**\n- Rated voltage: 24V\n- Max output: 150A at 6000 rpm\n- Cut-in speed: 900 rpm\n- Regulated voltage: 28.0 ± 0.3V",
    stockStatus: "in_stock",
    specifications: [
      { label: "Voltage", value: "24", unit: "V" },
      { label: "Current", value: "150", unit: "A" },
      { label: "Pulley Type", value: "Multi-groove (6PK)", unit: "" },
      { label: "Weight", value: "8.3", unit: "kg" },
    ],
    compatibility: [
      { make: "Toyota", model: "Land Cruiser 200", yearFrom: 2015, yearTo: 2021, engineCode: "1VD-FTV" },
      { make: "Nissan", model: "Patrol Y62", yearFrom: 2014, yearTo: 2022, engineCode: "VK56VD" },
    ],
    images: [{ url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80", alt: "Alternator 150A", isPrimary: true }],
    tags: ["alternator", "electrical", "charging", "24v"],
    featured: true,
  }),

  makePart({
    name: "Starter Motor 2.2kW",
    partNumber: "STM-22-DR",
    oemNumbers: ["28100-0L040", "28100-0L050"],
    brand: "Denso",
    category: "electrical",
    subcategory: "Starters",
    shortDescription: "Reduction-gear starter motor with 2.2kW output.",
    description:
      "Compact reduction-gear starter motor engineered for high-torque diesel engine cranking. Planetary gear reduction delivers 40% more cranking torque than direct-drive equivalents. Pre-engaged solenoid with dust boot.\n\n**Specifications:**\n- Power: 2.2 kW\n- Voltage: 12V\n- Rotation: CW (pinion end)\n- Number of teeth: 11\n- Duty cycle: intermittent",
    stockStatus: "in_stock",
    specifications: [
      { label: "Power", value: "2.2", unit: "kW" },
      { label: "Voltage", value: "12", unit: "V" },
      { label: "Pinion Teeth", value: "11", unit: "" },
      { label: "Weight", value: "4.8", unit: "kg" },
    ],
    compatibility: [
      { make: "Toyota", model: "Hilux", yearFrom: 2012, yearTo: 2023, engineCode: "2KD-FTV" },
      { make: "Toyota", model: "Fortuner", yearFrom: 2012, yearTo: 2023, engineCode: "2KD-FTV" },
    ],
    tags: ["starter", "motor", "electrical", "cranking"],
  }),

  makePart({
    name: "Glow Plug Set (4 pcs)",
    partNumber: "GP-4851-KIT",
    oemNumbers: ["19850-21020", "19850-21021"],
    brand: "NGK",
    category: "electrical",
    subcategory: "Glow Plugs",
    shortDescription: "Ceramic glow plug set for high-speed diesel engines.",
    description:
      "Quick-glow ceramic glow plug set reaching 1000°C in under 2 seconds. Self-regulating heating element eliminates the need for a separate controller in most applications.\n\n**Kit includes:** 4 glow plugs + terminal nuts + anti-seize compound\n\n**Technical Data:**\n- Voltage: 12V\n- Heating time to 1000°C: 1.8 seconds\n- Max temperature: 1100°C\n- Thread: M10 x 1.25\n- Hex size: 12 mm",
    stockStatus: "in_stock",
    specifications: [
      { label: "Type", value: "Ceramic", unit: "" },
      { label: "Voltage", value: "12", unit: "V" },
      { label: "Heat Time", value: "1.8", unit: "s" },
      { label: "Thread", value: "M10 x 1.25", unit: "" },
    ],
    compatibility: [
      { make: "Toyota", model: "Corolla", yearFrom: 2010, yearTo: 2018, engineCode: "1ND-TV" },
      { make: "Toyota", model: "Avensis", yearFrom: 2009, yearTo: 2015, engineCode: "1AD-FTV" },
    ],
    tags: ["glow-plug", "diesel", "ceramic", "heater"],
  }),

  makePart({
    name: "Shock Absorber Kit (Front Pair)",
    partNumber: "SA-3492-FT",
    oemNumbers: ["48510-69425", "48510-69435"],
    brand: "KYB",
    category: "suspension",
    subcategory: "Shock Absorbers",
    shortDescription: "Gas-charged twin-tube front shock absorbers. Pair.",
    description:
      "OE-quality gas-charged twin-tube shock absorbers for light truck front suspension. Nitrogen gas charge prevents cavitation and ensures consistent damping under heavy loads.\n\n**Technical Data:**\n- Type: Twin-tube, gas-charged\n- Stroke: 185 mm\n- Extended length: 575 mm\n- Compressed length: 390 mm\n- Damping force (rebound): 2450 N at 0.3 m/s\n- Damping force (compression): 850 N at 0.3 m/s",
    stockStatus: "in_stock",
    specifications: [
      { label: "Type", value: "Twin-tube Gas", unit: "" },
      { label: "Stroke", value: "185", unit: "mm" },
      { label: "Extended Length", value: "575", unit: "mm" },
      { label: "Compressed Length", value: "390", unit: "mm" },
    ],
    compatibility: [
      { make: "Toyota", model: "Hilux", yearFrom: 2015, yearTo: 2024 },
      { make: "Ford", model: "Ranger", yearFrom: 2012, yearTo: 2022 },
      { make: "Mazda", model: "BT-50", yearFrom: 2012, yearTo: 2022 },
    ],
    images: [{ url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", alt: "Shock Absorber", isPrimary: true }],
    tags: ["shock", "suspension", "gas", "front"],
    featured: true,
  }),

  makePart({
    name: "Coil Spring Set (Rear)",
    partNumber: "CS-774-HT",
    oemNumbers: ["48231-1KD10", "48231-1KD20"],
    brand: "Eibach",
    category: "suspension",
    subcategory: "Coil Springs",
    shortDescription: "Heavy-duty progressive rear coil springs for load-carrying.",
    description:
      "Progressive-rate coil springs engineered for vehicles that regularly carry heavy loads. The tightly wound lower coils provide a comfortable ride when unladen, while the open upper coils resist sag under load.\n\n**Specifications:**\n- Wire diameter: 14.5 mm\n- Free length: 380 mm\n- Spring rate (linear portion): 45 N/mm\n- Max load: 1400 kg per spring\n- Finish: Powder-coated matte black",
    stockStatus: "low_stock",
    stockNote: "Expected restock: 10 days",
    specifications: [
      { label: "Wire Diameter", value: "14.5", unit: "mm" },
      { label: "Free Length", value: "380", unit: "mm" },
      { label: "Spring Rate", value: "45", unit: "N/mm" },
      { label: "Max Load", value: "1400", unit: "kg" },
    ],
    compatibility: [
      { make: "Toyota", model: "Land Cruiser 200", yearFrom: 2015, yearTo: 2021 },
      { make: "Toyota", model: "Land Cruiser 300", yearFrom: 2021, yearTo: 2024 },
    ],
    tags: ["coil-spring", "rear", "heavy-duty", "progressive"],
  }),

  makePart({
    name: "Control Arm Assembly (Lower Front)",
    partNumber: "CA-628-LF",
    oemNumbers: ["48670-0K270", "48670-0K280"],
    brand: "Sankei",
    category: "suspension",
    subcategory: "Control Arms",
    shortDescription: "Complete lower control arm assembly with bushings and ball joint.",
    description:
      "Fully assembled lower control arm with pre-installed bushings and ball joint. Pressed from 4mm thick high-strength steel plate with welded reinforcement ribs. Corrosion-protected by e-coat primer.\n\n**Kit includes:**\n- Control arm assembly\n- Ball joint (pre-installed)\n- Bushings (pre-installed)\n- Installation hardware",
    stockStatus: "in_stock",
    specifications: [
      { label: "Material", value: "High-strength Steel", unit: "" },
      { label: "Thickness", value: "4", unit: "mm" },
      { label: "Ball Joint Stud", value: "M16 x 1.5", unit: "" },
      { label: "Weight", value: "3.8", unit: "kg" },
    ],
    compatibility: [
      { make: "Toyota", model: "Camry", yearFrom: 2012, yearTo: 2019 },
      { make: "Toyota", model: "RAV4", yearFrom: 2013, yearTo: 2019 },
    ],
    tags: ["control-arm", "suspension", "lower", "front"],
  }),

  makePart({
    name: "Oil Filter (Spin-On)",
    partNumber: "OF-210-EX",
    oemNumbers: ["04152-YZZA1", "04152-YZZA6"],
    brand: "Fram",
    category: "filters",
    subcategory: "Oil Filters",
    shortDescription: "Spin-on oil filter with silicone anti-drainback valve.",
    description:
      "Premium spin-on oil filter with synthetic media affording 98% efficiency at 20 microns. Silicone anti-drainback valve ensures immediate oil pressure on cold starts. High-burst-strength canister rated to 500 psi.\n\n**Specs:**\n- Thread: M20 x 1.5\n- Gasket OD: 66 mm\n- Height: 96 mm\n- Flow rate: 18 L/min\n- Bypass valve setting: 22 psi",
    stockStatus: "in_stock",
    specifications: [
      { label: "Thread", value: "M20 x 1.5", unit: "" },
      { label: "Height", value: "96", unit: "mm" },
      { label: "Filtration", value: "98% at 20", unit: "µm" },
      { label: "Flow Rate", value: "18", unit: "L/min" },
    ],
    compatibility: [
      { make: "Toyota", model: "Land Cruiser 70", yearFrom: 2007, yearTo: 2023 },
      { make: "Toyota", model: "Hilux", yearFrom: 2005, yearTo: 2024 },
      { make: "Toyota", model: "Fortuner", yearFrom: 2005, yearTo: 2024 },
    ],
    images: [{ url: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80", alt: "Oil Filter", isPrimary: true }],
    tags: ["oil-filter", "spin-on", "filtration"],
    featured: true,
  }),

  makePart({
    name: "Air Filter Panel",
    partNumber: "AF-3884-P",
    oemNumbers: ["17801-0H040", "17801-0H050"],
    brand: "MANN-FILTER",
    category: "filters",
    subcategory: "Air Filters",
    shortDescription: "Premium panel air filter with multi-layer synthetic media.",
    description:
      "High-performance air filter panel for truck applications. Three-layer synthetic media structure progressively traps particles from 50µm down to 5µm. Polyurethane sealing frame guarantees no bypass leakage.\n\n**Specifications:**\n- Length: 320 mm\n- Width: 215 mm\n- Height: 58 mm\n- Efficiency: 99.5%",
    stockStatus: "in_stock",
    specifications: [
      { label: "Length", value: "320", unit: "mm" },
      { label: "Width", value: "215", unit: "mm" },
      { label: "Height", value: "58", unit: "mm" },
      { label: "Efficiency", value: "99.5", unit: "%" },
    ],
    compatibility: [
      { make: "Mitsubishi", model: "Canter", yearFrom: 2012, yearTo: 2022 },
      { make: "Hino", model: "300 Series", yearFrom: 2011, yearTo: 2021 },
    ],
    tags: ["air-filter", "panel", "engine", "filtration"],
  }),

  makePart({
    name: "Fuel Filter / Water Separator",
    partNumber: "FF-592-WS",
    oemNumbers: ["23390-0L040", "23390-0L050"],
    brand: "Donaldson",
    category: "filters",
    subcategory: "Fuel Filters",
    shortDescription: "Fuel filter with integral water separator bowl and drain.",
    description:
      "Spin-on fuel filter with transparent water separator bowl. Filtration down to 4 microns protects high-pressure fuel injection systems. The water drain valve at the base allows for routine water purging without filter removal.\n\n**Technical Data:**\n- Filtration efficiency: 99% at 4 µm\n- Water separation: 95%\n- Flow capacity: 120 L/h\n- Thread: M16 x 1.5\n- Bowl capacity: 150 mL",
    stockStatus: "in_stock",
    specifications: [
      { label: "Filtration", value: "99% at 4", unit: "µm" },
      { label: "Water Separation", value: "95", unit: "%" },
      { label: "Flow Capacity", value: "120", unit: "L/h" },
      { label: "Thread", value: "M16 x 1.5", unit: "" },
    ],
    compatibility: [
      { make: "Toyota", model: "Hilux", yearFrom: 2015, yearTo: 2024, engineCode: "2GD-FTV" },
      { make: "Toyota", model: "Fortuner", yearFrom: 2016, yearTo: 2024, engineCode: "1GD-FTV" },
      { make: "Isuzu", model: "D-Max", yearFrom: 2020, yearTo: 2024, engineCode: "RZ4E" },
    ],
    images: [{ url: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&q=80", alt: "Diesel Fuel Filter Kit", isPrimary: true }],
    tags: ["fuel-filter", "water-separator", "diesel", "filtration"],
    featured: true,
  }),

  makePart({
    name: "Radiator Assembly",
    partNumber: "RAD-429-A",
    oemNumbers: ["16400-0L090", "16400-0L100"],
    brand: "Denso",
    category: "cooling",
    subcategory: "Radiators",
    shortDescription: "Aluminum radiator with plastic tanks. Direct OE replacement.",
    description:
      "OEM-specification radiator with brazed aluminum core and glass-fiber reinforced nylon tanks. TIG-welded inlet and outlet fittings. 38mm core thickness provides heat rejection identical to the factory unit.\n\n**Specifications:**\n- Core dimensions: 650 x 450 x 38 mm\n- Inlet: 38 mm\n- Outlet: 38 mm\n- Heat rejection: 95 kW at 40°C delta-T",
    stockStatus: "in_stock",
    specifications: [
      { label: "Core Material", value: "Aluminum", unit: "" },
      { label: "Tank Material", value: "Nylon PA66-GF30", unit: "" },
      { label: "Core Size", value: "650 x 450 x 38", unit: "mm" },
      { label: "Heat Rejection", value: "95", unit: "kW" },
    ],
    compatibility: [
      { make: "Toyota", model: "Hilux", yearFrom: 2012, yearTo: 2020, engineCode: "2KD-FTV" },
      { make: "Toyota", model: "Hilux", yearFrom: 2015, yearTo: 2020, engineCode: "2GD-FTV" },
    ],
    tags: ["radiator", "cooling", "aluminum"],
  }),

  makePart({
    name: "Thermostat 82°C",
    partNumber: "TH-82-OE",
    oemNumbers: ["90916-03100", "90916-03101"],
    brand: "Mahle",
    category: "cooling",
    subcategory: "Thermostats",
    shortDescription: "Wax-pellet thermostat, 82°C opening temperature.",
    description:
      "Wax-pellet engine thermostat calibrated to begin opening at 82°C and fully open at 96°C. Supplied with integrated gasket seal. OE-grade construction with stainless steel spring for consistent long-term performance.\n\n**Opening temperatures:**\n- Starts opening: 82°C\n- Fully open: 96°C\n- Lift: 8 mm at 100°C",
    stockStatus: "in_stock",
    specifications: [
      { label: "Type", value: "Wax Pellet", unit: "" },
      { label: "Opening Temp", value: "82", unit: "°C" },
      { label: "Full Open Temp", value: "96", unit: "°C" },
      { label: "Valve Lift", value: "8", unit: "mm" },
    ],
    compatibility: [
      { make: "Toyota", model: "Land Cruiser 70", yearFrom: 2007, yearTo: 2023 },
      { make: "Toyota", model: "Hilux", yearFrom: 2005, yearTo: 2024 },
      { make: "Toyota", model: "Fortuner", yearFrom: 2005, yearTo: 2024 },
    ],
    tags: ["thermostat", "cooling", "engine"],
  }),

  makePart({
    name: "Water Pump Assembly",
    partNumber: "WP-2138-E",
    oemNumbers: ["16100-0L040", "16100-0L041"],
    brand: "Aisin",
    category: "cooling",
    subcategory: "Water Pumps",
    shortDescription: "Engine water pump with cast-iron impeller and ceramic seal.",
    description:
      "OEM-quality centrifugal water pump featuring a CNC-machined cast-iron impeller, double-row sealed ball bearing, and silicon carbide mechanical seal. The pump body is high-pressure die-cast aluminum.\n\n**Pump Characteristics:**\n- Flow rate: 200 L/min at 3000 rpm\n- Impeller: 6-blade cast iron\n- Seal: Silicon carbide vs. carbon\n- Pulley included: No (use existing)",
    stockStatus: "out_of_stock",
    stockNote: "Expected restock: 3 weeks",
    specifications: [
      { label: "Flow Rate", value: "200", unit: "L/min" },
      { label: "Impeller", value: "Cast Iron, 6-blade", unit: "" },
      { label: "Seal Type", value: "SiC/Carbon", unit: "" },
      { label: "Body Material", value: "Die-cast Aluminum", unit: "" },
    ],
    compatibility: [
      { make: "Toyota", model: "Hilux", yearFrom: 2005, yearTo: 2015, engineCode: "2KD-FTV" },
      { make: "Toyota", model: "Fortuner", yearFrom: 2005, yearTo: 2015, engineCode: "2KD-FTV" },
    ],
    tags: ["water-pump", "cooling", "engine"],
  }),

  makePart({
    name: "Piston Ring Set (Standard)",
    partNumber: "PR-92-STD",
    oemNumbers: ["13011-0L030", "13011-0L031"],
    brand: "Riken",
    category: "engine",
    subcategory: "Piston Rings",
    shortDescription: "Standard-bore 92mm piston ring set — 3 rings per piston.",
    description:
      "Premium piston ring set manufactured by Riken. Each set contains 3 rings per piston: chrome-faced top compression ring, taper-faced second compression ring, and chrome-plated oil control ring assembly.\n\n**Ring Pack:**\n- Top ring: Barrel-faced, moly-filled, 1.2 mm\n- Second ring: Taper-faced, 1.5 mm\n- Oil ring: 3-piece with expander, 2.5 mm",
    stockStatus: "in_stock",
    specifications: [
      { label: "Bore Size", value: "92", unit: "mm" },
      { label: "Top Ring Width", value: "1.2", unit: "mm" },
      { label: "Second Ring Width", value: "1.5", unit: "mm" },
      { label: "Oil Ring Width", value: "2.5", unit: "mm" },
    ],
    compatibility: [
      { make: "Toyota", model: "Land Cruiser 70", yearFrom: 2007, yearTo: 2023, engineCode: "1VD-FTV" },
    ],
    tags: ["piston-ring", "engine-internals", "standard-bore"],
  }),

  makePart({
    name: "Timing Belt Kit",
    partNumber: "TBK-306-K",
    oemNumbers: ["13568-09070", "13568-09080"],
    brand: "Gates",
    category: "belts_chains",
    subcategory: "Timing Belts",
    shortDescription: "Complete timing belt kit with tensioner and idler pulleys.",
    description:
      "Full timing belt replacement kit includes the belt, hydraulic tensioner, idler pulley, and water pump gasket. Belt features high-tensile tensile cords and nitrile rubber teeth for 120,000 km service intervals.\n\n**Kit Contents:**\n- Timing belt (147 teeth, 28 mm wide)\n- Hydraulic tensioner assembly\n- Idler pulley (smooth)\n- Water pump gasket\n- Installation manual",
    stockStatus: "in_stock",
    specifications: [
      { label: "Belt Teeth", value: "147", unit: "" },
      { label: "Belt Width", value: "28", unit: "mm" },
      { label: "Service Interval", value: "120,000", unit: "km" },
      { label: "Tensioner Type", value: "Hydraulic", unit: "" },
    ],
    compatibility: [
      { make: "Toyota", model: "Hilux", yearFrom: 2005, yearTo: 2015, engineCode: "2KD-FTV" },
    ],
    tags: ["timing-belt", "kit", "engine" ],
    featured: true,
  }),

  makePart({
    name: "V-Ribbed Belt (6PK)",
    partNumber: "VB-6PK2140",
    oemNumbers: ["90916-02634", "90916-02635"],
    brand: "Continental",
    category: "belts_chains",
    subcategory: "Serpentine Belts",
    shortDescription: "6-rib 2140mm EPDM serpentine belt for accessory drive.",
    description:
      "High-durability EPDM (ethylene propylene diene monomer) V-ribbed belt. Resists cracking and ozone degradation far longer than standard CR (chloroprene) belts. Designed for silent operation with minimal vibration.\n\n**Specifications:**\n- Ribs: 6\n- Effective length: 2140 mm\n- Material: EPDM\n- Temperature range: -40°C to +140°C",
    stockStatus: "in_stock",
    specifications: [
      { label: "Rib Count", value: "6", unit: "" },
      { label: "Effective Length", value: "2140", unit: "mm" },
      { label: "Material", value: "EPDM", unit: "" },
      { label: "Temp Range", value: "-40 to +140", unit: "°C" },
    ],
    compatibility: [
      { make: "Toyota", model: "Hilux", yearFrom: 2015, yearTo: 2024 },
      { make: "Toyota", model: "Fortuner", yearFrom: 2016, yearTo: 2024 },
      { make: "Toyota", model: "Land Cruiser 200", yearFrom: 2015, yearTo: 2021 },
    ],
    tags: ["serpentine-belt", "accessory", "6pk", "epdm"],
  }),

  makePart({
    name: "Turbocharger Core (CHRA)",
    partNumber: "TC-4710-CHRA",
    oemNumbers: ["17201-0L040", "17201-0L050"],
    brand: "Garrett Motion",
    category: "engine",
    subcategory: "Turbochargers",
    shortDescription: "Turbo center housing rotating assembly for direct replacement.",
    description:
      "Factory-balanced CHRA (Center Housing Rotating Assembly) for turbocharger rebuild applications. Includes compressor wheel, turbine wheel, shaft, bearings, and center housing pre-assembled and VSR balanced.\n\n**Specifications:**\n- Compressor wheel: 52 mm inducer / 76 mm exducer\n- Turbine wheel: 58 mm / 52 mm\n- Bearing: Journal type with piston ring seal\n- Balance: ISO 1940 G2.5",
    stockStatus: "in_stock",
    specifications: [
      { label: "Compressor Inducer", value: "52", unit: "mm" },
      { label: "Compressor Exducer", value: "76", unit: "mm" },
      { label: "Turbine Trim", value: "58/52", unit: "mm" },
      { label: "Bearing Type", value: "Journal (Piston Ring)", unit: "" },
    ],
    compatibility: [
      { make: "Toyota", model: "Hilux", yearFrom: 2015, yearTo: 2024, engineCode: "2GD-FTV" },
      { make: "Toyota", model: "Fortuner", yearFrom: 2016, yearTo: 2024, engineCode: "1GD-FTV" },
    ],
    images: [{ url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", alt: "Turbo CHRA Core", isPrimary: true }],
    tags: ["turbo", "chra", "engine", "forced-induction"],
    featured: true,
  }),

  makePart({
    name: "Brake Master Cylinder",
    partNumber: "BMC-425-1",
    oemNumbers: ["47201-0K080", "47201-0K090"],
    brand: "Advics",
    category: "brakes",
    subcategory: "Master Cylinders",
    shortDescription: "Tandem brake master cylinder with 25.4mm bore.",
    description:
      "Tandem (dual-circuit) brake master cylinder with 25.4 mm bore diameter. Cast iron body with corrosion-resistant internal coating. Compatible with DOT 3, DOT 4, and DOT 5.1 brake fluids.\n\n**Specifications:**\n- Bore: 25.4 mm (1 inch)\n- Stroke: 38 mm\n- Port thread: M12 x 1.0\n- Reservoir capacity: 300 mL",
    stockStatus: "low_stock",
    stockNote: "Only 3 units remaining",
    specifications: [
      { label: "Type", value: "Tandem (Dual Circuit)", unit: "" },
      { label: "Bore", value: "25.4", unit: "mm" },
      { label: "Stroke", value: "38", unit: "mm" },
      { label: "Reservoir Capacity", value: "300", unit: "mL" },
    ],
    compatibility: [
      { make: "Toyota", model: "Hilux", yearFrom: 2012, yearTo: 2020 },
      { make: "Toyota", model: "Fortuner", yearFrom: 2012, yearTo: 2020 },
    ],
    tags: ["master-cylinder", "brake", "hydraulic"],
  }),

  makePart({
    name: "Wheel Bearing Kit (Front)",
    partNumber: "WB-1092-F",
    oemNumbers: ["90369-41001", "90369-41002"],
    brand: "SKF",
    category: "suspension",
    subcategory: "Wheel Bearings",
    shortDescription: "Tapered roller bearing kit with race and seal.",
    description:
      "Complete front wheel bearing kit containing inner bearing, outer bearing, inner race, outer race, oil seal, and cotter pin. Tapered roller design supports both radial and axial loads.\n\n**Kit Contents:**\n- Inner bearing: 30210\n- Outer bearing: 30208\n- Inner race (cup): pre-installed optional\n- Grease seal: double-lip\n- High-temp bearing grease included",
    stockStatus: "in_stock",
    specifications: [
      { label: "Inner Bearing", value: "30210", unit: "" },
      { label: "Outer Bearing", value: "30208", unit: "" },
      { label: "Type", value: "Tapered Roller", unit: "" },
      { label: "Load Rating", value: "58", unit: "kN" },
    ],
    compatibility: [
      { make: "Toyota", model: "Land Cruiser 70", yearFrom: 2007, yearTo: 2023 },
      { make: "Toyota", model: "Land Cruiser 200", yearFrom: 2008, yearTo: 2021 },
    ],
    tags: ["wheel-bearing", "tapered-roller", "front", "suspension"],
  }),

  makePart({
    name: "CV Axle Shaft (Right)",
    partNumber: "CV-3182-R",
    oemNumbers: ["43430-0K120", "43430-0K130"],
    brand: "GKN",
    category: "transmission",
    subcategory: "Axle Shafts",
    shortDescription: "Right-side CV axle shaft assembly with boots and joints.",
    description:
      "Complete CV axle shaft assembly for right-side installation. Factory-assembled with inner tripod joint, outer Rzeppa ball joint, boots, clamps, and grease. Shaft is induction-hardened for torsional strength.\n\n**Specifications:**\n- Shaft length: 685 mm\n- Spline count (hub): 27\n- Spline count (diff): 30\n- Joint type: Rzeppa (outer), Tripod (inner)\n- Boot material: Thermoplastic polyurethane",
    stockStatus: "in_stock",
    specifications: [
      { label: "Shaft Length", value: "685", unit: "mm" },
      { label: "Hub Spline", value: "27", unit: "" },
      { label: "Diff Spline", value: "30", unit: "" },
      { label: "Outer Joint", value: "Rzeppa (6-ball)", unit: "" },
    ],
    compatibility: [
      { make: "Toyota", model: "Camry", yearFrom: 2012, yearTo: 2019 },
      { make: "Toyota", model: "RAV4", yearFrom: 2013, yearTo: 2019 },
    ],
    tags: ["cv-axle", "driveshaft", "transmission", "front-wheel-drive"],
  }),
];
