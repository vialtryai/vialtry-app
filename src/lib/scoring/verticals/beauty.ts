// Vialtry — Beauty & Personal Care Vertical Attributes (North America)

import { AttributeDef, stripHtml } from '../pdp'

export const beautyAttributes: AttributeDef[] = [
  // PRODUCT BASICS
  { category:'Beauty', attribute:'net_volume_weight', label:'Net Volume / Weight', ai_weight:10, required:'Required', auto_fix:'Add net volume/weight: e.g. "1 fl oz / 30ml" or "1.7 oz / 50g". Required for US labeling.', check:(p)=>/fl oz|ml|oz|g\b|gram|liter|litre|\d+\s*(ml|oz|fl)/i.test(stripHtml(p.body_html)) },
  { category:'Beauty', attribute:'product_form', label:'Product Form / Format', ai_weight:10, required:'Required', auto_fix:'Add product format: serum, cream, gel, oil, powder, stick, spray, foam, balm, mask etc.', check:(p)=>/serum|cream|gel|oil|powder|stick|spray|foam|balm|mask|lotion|mousse|toner|essence|mist/i.test(p.tags?.toLowerCase()||p.product_type?.toLowerCase()||stripHtml(p.body_html).toLowerCase()) },
  { category:'Beauty', attribute:'pack_size', label:'Pack Size Options', ai_weight:9, required:'Recommended', auto_fix:'Add pack size variants if available: trial size, full size, value pack, refill.', check:(p)=>p.variants?.length>1||/pack|set|bundle|travel|mini|full.size|value/i.test(p.tags||'') },

  // SKIN PROFILE
  { category:'Beauty', attribute:'skin_type', label:'Skin Type', ai_weight:10, required:'Required', auto_fix:'Add skin type tags: oily, dry, combination, sensitive, normal, all skin types. Critical for AI beauty queries.', check:(p)=>/oily|dry skin|combination|sensitive|normal skin|all skin|every skin/i.test(p.tags?.toLowerCase()||stripHtml(p.body_html).toLowerCase()) },
  { category:'Beauty', attribute:'skin_concern', label:'Skin Concern', ai_weight:10, required:'Required', auto_fix:'Add skin concern tags: acne, aging, hyperpigmentation, dryness, redness, pores, dark circles etc.', check:(p)=>/acne|aging|ageing|wrinkle|hyperpigmentation|dark spot|redness|pore|dark circle|firmness|brightening|hydration/i.test(p.tags?.toLowerCase()||stripHtml(p.body_html).toLowerCase()) },
  { category:'Beauty', attribute:'skin_barrier', label:'Skin Barrier Support', ai_weight:9, required:'Recommended', auto_fix:'Add skin barrier benefit if applicable. Top AI beauty search in US 2024-25.', check:(p)=>/barrier|ceramide|niacinamide|peptide|hyaluronic/i.test(stripHtml(p.body_html))||true },

  // KEY INGREDIENTS
  { category:'Beauty', attribute:'hero_ingredients', label:'Key Actives / Hero Ingredients', ai_weight:10, required:'Required', auto_fix:'List top 3-5 active ingredients with concentrations. e.g. "2% Salicylic Acid, 5% Niacinamide".', check:(p)=>/ingredient|active|retinol|vitamin c|niacinamide|hyaluronic|salicylic|glycolic|peptide|ceramide|aha|bha|spf/i.test(stripHtml(p.body_html)) },
  { category:'Beauty', attribute:'active_concentration', label:'Active Concentration %', ai_weight:10, required:'Required', auto_fix:'Add percentage concentration of hero actives: "Contains 10% Vitamin C".', check:(p)=>/\d+(\.\d+)?%/i.test(stripHtml(p.body_html)) },

  // CERTIFICATIONS — US Market
  { category:'Beauty', attribute:'cruelty_free', label:'Cruelty-Free', ai_weight:10, required:'Required', auto_fix:'Add cruelty-free status. If certified: add Leaping Bunny or PETA certification badge.', check:(p)=>/cruelty.free|not tested on animals|leaping bunny|peta/i.test(stripHtml(p.body_html)) },
  { category:'Beauty', attribute:'vegan', label:'Vegan (if applicable)', ai_weight:9, required:'Recommended', auto_fix:'Add vegan status if applicable. Vegan beauty is top filter in US D2C market.', check:(p)=>/vegan|no animal|plant.based/i.test(stripHtml(p.body_html))||true },
  { category:'Beauty', attribute:'clean_beauty', label:'Clean Beauty Claims', ai_weight:9, required:'Recommended', auto_fix:'Add clean beauty claims: alcohol-free, fragrance-free, paraben-free, sulfate-free etc. Top US beauty filter.', check:(p)=>/alcohol.free|fragrance.free|paraben.free|sulfate.free|silicone.free|clean|non.toxic/i.test(stripHtml(p.body_html)) },
  { category:'Beauty', attribute:'dermatologist_tested', label:'Dermatologist Tested', ai_weight:10, required:'Required', auto_fix:'Add dermatologist tested claim if applicable. High trust signal in US market.', check:(p)=>/dermatologist|clinically|allergy.tested|hypoallergenic|tested by/i.test(stripHtml(p.body_html))||true },

  // USAGE
  { category:'Beauty', attribute:'when_to_apply', label:'When to Apply (AM/PM/Both)', ai_weight:10, required:'Required', auto_fix:'Add AM/PM usage: "Use AM and PM" or "PM only — contains retinol". Critical for AI skincare routine queries.', check:(p)=>/am|pm|morning|night|daily|twice|routine/i.test(stripHtml(p.body_html)) },
  { category:'Beauty', attribute:'how_to_use', label:'How to Use / Application Method', ai_weight:10, required:'Required', auto_fix:'Add step-by-step: "Apply X drops to cleansed skin. Massage in upward motions. Follow with moisturizer."', check:(p)=>/how to use|apply|application|step|direction|use:|usage/i.test(stripHtml(p.body_html)) },
  { category:'Beauty', attribute:'layering_order', label:'Skincare Routine / Layering Order', ai_weight:10, required:'Required', auto_fix:'Add layering step: "Step 2 in routine — after cleanser, before moisturizer". Wins AI routine builder queries.', check:(p)=>/step|routine|layer|after|before|cleanser|moisturizer|order/i.test(stripHtml(p.body_html)) },
  { category:'Beauty', attribute:'results_timeline', label:'Results Timeline', ai_weight:10, required:'Required', auto_fix:'Add results expectation: "Visible results in 4 weeks. Full results in 8-12 weeks."', check:(p)=>/week|result|visible|within|after \d|days|month/i.test(stripHtml(p.body_html)) },
  { category:'Beauty', attribute:'frequency', label:'Frequency of Use', ai_weight:9, required:'Recommended', auto_fix:'Add usage frequency: "Use twice daily" or "Use 2-3 times per week".', check:(p)=>/twice|once|daily|weekly|\d+ times|every day|every other|frequency/i.test(stripHtml(p.body_html)) },

  // SAFETY
  { category:'Beauty', attribute:'pregnancy_safe', label:'Pregnancy Safe', ai_weight:10, required:'Required', auto_fix:'Add pregnancy safety status. High-intent search in US. e.g. "Safe for use during pregnancy" or "Not recommended during pregnancy".', check:(p)=>/pregnancy|pregnant|nursing|breastfeeding|prenatal/i.test(stripHtml(p.body_html))||true },
  { category:'Beauty', attribute:'patch_test', label:'Patch Test Advised', ai_weight:9, required:'Recommended', auto_fix:'Add patch test instruction for new users. Reduces returns and reviews complaints.', check:(p)=>/patch test|test on small|sensitive area/i.test(stripHtml(p.body_html))||true },

  // PRODUCT LIFECYCLE
  { category:'Beauty', attribute:'pao', label:'PAO (Period After Opening)', ai_weight:10, required:'Required', auto_fix:'Add PAO: "Best used within 12 months of opening" or show PAO symbol (12M, 24M).', check:(p)=>/pao|period after opening|months of opening|best before|expiry|use within/i.test(stripHtml(p.body_html)) },
  { category:'Beauty', attribute:'non_comedogenic', label:'Non-Comedogenic', ai_weight:9, required:'Recommended', auto_fix:'Add non-comedogenic claim if applicable. Critical for acne-prone skin queries.', check:(p)=>/non.comedogenic|won.t clog|doesnt clog|pore.free/i.test(stripHtml(p.body_html))||true },

  // US COMPLIANCE
  { category:'Beauty', attribute:'fda_disclaimer', label:'FDA Disclaimer (supplements)', ai_weight:9, required:'Recommended', auto_fix:'Add FDA disclaimer if making health claims: "These statements have not been evaluated by the FDA."', check:(p)=>{ const needsDisclaimer=/supplement|vitamin|collagen|probiotic|health benefit/i.test(p.product_type||p.tags||''); if(!needsDisclaimer)return true; return /fda|disclaimer|not intended to diagnose/i.test(stripHtml(p.body_html)) } },
  { category:'Beauty', attribute:'ingredient_list', label:'Full Ingredient List (INCI)', ai_weight:10, required:'Required', auto_fix:'Add full INCI ingredient list. US FDA requires complete ingredient disclosure on cosmetics.', check:(p)=>/ingredients:|contains:|inci|aqua|water\b/i.test(stripHtml(p.body_html)) },
  { category:'Beauty', attribute:'spf_rating', label:'SPF Rating (if applicable)', ai_weight:10, required:'Required', auto_fix:'Add SPF rating prominently: "SPF 50 PA+++". Required FDA disclosure for sunscreen products.', check:(p)=>{ const isSunscreen=/sunscreen|spf|sun protection|uv|sunblock/i.test(p.product_type||p.tags||''); if(!isSunscreen)return true; return /spf\s*\d+/i.test(p.title||'')||/spf\s*\d+/i.test(stripHtml(p.body_html)) } },
]
