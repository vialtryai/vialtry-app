// Vialtry — Home & Living Vertical Attributes (North America)

import { AttributeDef, stripHtml } from '../pdp'

export const homeAttributes: AttributeDef[] = [
  // PHYSICAL SPECS
  { category:'Home', attribute:'primary_material', label:'Material / Primary Material', ai_weight:10, required:'Required', auto_fix:'Add primary material: solid wood, MDF, metal, glass, ceramic, polyester, cotton, bamboo etc.', check:(p)=>/wood|oak|pine|walnut|mdf|metal|steel|iron|glass|ceramic|fabric|polyester|cotton|linen|bamboo|rattan|marble/i.test(stripHtml(p.body_html)) },
  { category:'Home', attribute:'dimensions', label:'Overall Dimensions (L x W x H)', ai_weight:10, required:'Required', auto_fix:'Add exact dimensions in inches: "L: 60" x W: 30" x H: 30"". Critical for US home shopping AI queries.', check:(p)=>/\d+["\']\s*x\s*\d+["\']\s*x\s*\d+["\']|\d+\s*inch|\d+\s*cm|\d+w\s*x\s*\d+d|\bL:\s*\d+/i.test(stripHtml(p.body_html)) },
  { category:'Home', attribute:'colour_finish', label:'Colour / Finish Name', ai_weight:10, required:'Required', auto_fix:'Add specific colour + finish: "Warm Oak Natural Finish" not just "Brown". Include hex code if possible.', check:(p)=>p.variants?.some((v:any)=>!!v.option1)||/finish|color|colour|stain|paint/i.test(p.tags?.toLowerCase()||'') },
  { category:'Home', attribute:'surface_finish', label:'Surface Finish', ai_weight:9, required:'Recommended', auto_fix:'Add finish type: matte, glossy, satin, brushed, polished, distressed, lacquered etc.', check:(p)=>/matte|gloss|satin|brushed|polished|distressed|lacquer|powder.coat|painted/i.test(stripHtml(p.body_html))||true },
  { category:'Home', attribute:'weight', label:'Product Weight', ai_weight:8, required:'Recommended', auto_fix:'Add product weight in lbs. Helps customers estimate shipping and handling.', check:(p)=>p.variants?.some((v:any)=>v.grams>0)||/\d+\s*(lbs?|kg|pounds?)/i.test(stripHtml(p.body_html)) },

  // ASSEMBLY & INSTALLATION
  { category:'Home', attribute:'assembly_required', label:'Assembly Required', ai_weight:10, required:'Required', auto_fix:'Clearly state if assembly required: "Assembly required — takes approx 30 mins. Tools included."', check:(p)=>/assembly|assemble|no assembly|ready to use|flat pack|self.assembly|tools required/i.test(stripHtml(p.body_html)) },
  { category:'Home', attribute:'tools_required', label:'Tools Required for Assembly', ai_weight:9, required:'Recommended', auto_fix:'List tools needed: screwdriver, allen key etc. Or state "No tools required — click-and-lock system."', check:(p)=>/tool|screwdriver|allen|wrench|drill|hammer|no tool/i.test(stripHtml(p.body_html))||true },
  { category:'Home', attribute:'assembly_manual', label:'Assembly Manual / Instructions URL', ai_weight:9, required:'Recommended', auto_fix:'Link to assembly PDF or video: "Download assembly guide (PDF)" or YouTube tutorial link.', check:(p)=>/manual|instruction|guide|pdf|tutorial|how to assemble/i.test(stripHtml(p.body_html))||true },
  { category:'Home', attribute:'wall_anchor', label:'Wall Anchoring Required', ai_weight:9, required:'Recommended', auto_fix:'State if wall anchoring required for safety (tip-over prevention). ASTM F2057 US standard for furniture.', check:(p)=>/wall anchor|tip.over|anti.tip|wall mount|secure to wall/i.test(stripHtml(p.body_html))||true },

  // WARRANTY
  { category:'Home', attribute:'warranty_period', label:'Warranty Period', ai_weight:10, required:'Required', auto_fix:'Add warranty: "1-year manufacturer warranty" or "Limited lifetime warranty". Critical trust signal in US.', check:(p)=>/warranty|\d+.year|lifetime|guarantee/i.test(stripHtml(p.body_html)) },
  { category:'Home', attribute:'warranty_type', label:'Warranty Type', ai_weight:9, required:'Recommended', auto_fix:'Specify warranty type: manufacturer defects only, structural, full replacement, limited etc.', check:(p)=>/manufacturer|structural|limited|full replacement|defect/i.test(stripHtml(p.body_html))||true },

  // ROOM & STYLE
  { category:'Home', attribute:'room_suitability', label:'Room Suitability', ai_weight:10, required:'Required', auto_fix:'Add room tags: living room, bedroom, dining room, home office, bathroom, outdoor etc.', check:(p)=>/living room|bedroom|dining|kitchen|bathroom|office|outdoor|patio|nursery|hallway/i.test(p.tags?.toLowerCase()||stripHtml(p.body_html).toLowerCase()) },
  { category:'Home', attribute:'interior_style', label:'Interior Design Style', ai_weight:10, required:'Required', auto_fix:'Add style tags: mid-century modern, Scandinavian, industrial, bohemian, farmhouse, minimalist, coastal etc.', check:(p)=>/mid.century|scandinavian|industrial|bohemian|farmhouse|minimalist|coastal|modern|traditional|rustic|contemporary/i.test(p.tags?.toLowerCase()||stripHtml(p.body_html).toLowerCase()) },
  { category:'Home', attribute:'indoor_outdoor', label:'Indoor / Outdoor Use', ai_weight:10, required:'Required', auto_fix:'Clearly state: indoor only, outdoor only, or indoor/outdoor. Critical for AI home queries.', check:(p)=>/indoor|outdoor|outside|inside|weather.resistant|weatherproof/i.test(stripHtml(p.body_html)) },

  // COMPATIBILITY
  { category:'Home', attribute:'induction_compatible', label:'Induction Compatible (cookware)', ai_weight:10, required:'Required', auto_fix:'For cookware: state induction compatibility. "Compatible with: gas, electric, induction, oven-safe to 400°F".', check:(p)=>{ const isCookware=/cookware|pan|pot|skillet|wok|casserole/i.test(p.product_type||p.tags||''); if(!isCookware)return true; return /induction|gas|electric|stovetop/i.test(stripHtml(p.body_html)) } },
  { category:'Home', attribute:'dishwasher_safe', label:'Dishwasher Safe', ai_weight:9, required:'Recommended', auto_fix:'State dishwasher safety for applicable products. "Dishwasher safe — top rack only".', check:(p)=>{ const needsCheck=/cookware|pan|pot|plate|bowl|glass|mug|cutlery/i.test(p.product_type||p.tags||''); if(!needsCheck)return true; return /dishwasher|hand wash|machine wash/i.test(stripHtml(p.body_html)) } },

  // CARE
  { category:'Home', attribute:'care_instructions', label:'Care & Maintenance Instructions', ai_weight:9, required:'Required', auto_fix:'Add care instructions: cleaning method, maintenance, do\'s and don\'ts. e.g. "Spot clean with damp cloth. Avoid direct sunlight."', check:(p)=>/clean|care|maintain|wipe|dust|polish|avoid|do not|wash/i.test(stripHtml(p.body_html)) },

  // US COMPLIANCE
  { category:'Home', attribute:'prop65', label:'CA Prop 65 Warning (if applicable)', ai_weight:9, required:'Recommended', auto_fix:'Add Prop 65 warning if selling in CA: "WARNING: This product can expose you to chemicals..." Required for wood/MDF furniture sold in California.', check:(p)=>/prop 65|proposition 65|california warning|chemical|lead|formaldehyde/i.test(stripHtml(p.body_html))||true },
  { category:'Home', attribute:'flame_retardant', label:'Flame Retardant / Fire Safety', ai_weight:9, required:'Recommended', auto_fix:'Add flame retardant status for upholstered furniture. California TB117-2013 standard reference.', check:(p)=>{ const isUpholstered=/sofa|couch|chair|mattress|cushion|pillow|upholster/i.test(p.product_type||p.tags||''); if(!isUpholstered)return true; return /flame|fire|tb117|retardant/i.test(stripHtml(p.body_html))||true } },
  { category:'Home', attribute:'lead_free', label:'Lead-Free / Non-Toxic (children\'s items)', ai_weight:10, required:'Required', auto_fix:'Add lead-free, non-toxic claim for children\'s furniture and toys. CPSC compliance.', check:(p)=>{ const isKids=/kids|children|nursery|baby|toddler/i.test(p.product_type||p.tags||''); if(!isKids)return true; return /lead.free|non.toxic|cpsc|astm|safe for children/i.test(stripHtml(p.body_html)) } },

  // AI COMMERCE
  { category:'Home', attribute:'room_size_rec', label:'Room Size Recommendation', ai_weight:9, required:'Recommended', auto_fix:'Add room size guide: "Best for rooms 10x12 ft or larger". Helps AI answer "what size rug for living room" queries.', check:(p)=>/room size|\d+x\d+|sq ft|square feet|fits in|works in/i.test(stripHtml(p.body_html))||true },
  { category:'Home', attribute:'flat_pack', label:'Flat Pack / Ready Assembled', ai_weight:9, required:'Recommended', auto_fix:'State packaging type: flat pack (ships disassembled) or fully assembled. Affects shipping and AI queries.', check:(p)=>/flat pack|flat.pack|ready assembled|fully assembled|ships assembled|knock.down/i.test(stripHtml(p.body_html))||true },
]
