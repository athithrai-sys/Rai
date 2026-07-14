-- Swappo — Phase 1 sample data (13 Dutch listings around Utrecht)
-- Run AFTER schema.sql: SQL Editor → New query → paste → Run.
-- Safe to run more than once (upserts on slug).

insert into public.listings
  (slug, title, description, price_per_day, category, condition, city, postcode,
   emoji, bg, rating, rating_count, available_from, available_to, owner_name, is_anonymous)
values
  ('bosch-accuboormachine', 'Bosch accuboormachine 18V',
   'Krachtige accuboormachine van Bosch (GSR 18V) met twee accu''s, lader en bitset. Ideaal voor klussen in huis.',
   4, 'others', 'Goed', 'Utrecht Oost', '3581 CD',
   '🛠️', 'linear-gradient(135deg,#0e5c4a,#2e8b6f)', 4.8, 23, '2026-07-25', '2026-07-28', 'Jeroen', false),

  ('karcher-hogedrukreiniger', 'Kärcher K5 hogedrukreiniger',
   'Kärcher K5 Premium hogedrukreiniger met terrasreiniger-opzetstuk. Perfect voor terras, tegels en de auto.',
   9, 'garden-tools', 'Zo goed als nieuw', 'Vleuten', '3451 WD',
   '🚿', 'linear-gradient(135deg,#2c3e50,#4b6584)', 4.6, 17, '2026-07-20', '2026-08-03', 'Sanne', false),

  ('partytent', 'Partytent 3×6 meter',
   'Ruime witte partytent met afneembare zijwanden. Opzetten kan met twee personen in een half uur. Incl. haringen en touw.',
   15, 'others', 'Goed', 'De Meern', '3453 KL',
   '⛺', 'linear-gradient(135deg,#00695c,#4db6ac)', 4.4, 9, '2026-08-01', '2026-08-31', null, true),

  ('ps4-controller', 'PS4 controller (DualShock 4)',
   'Originele Sony DualShock 4 controller, zwart. Handig als je vrienden over de vloer hebt voor een game-avond.',
   2, 'gaming', 'Goed', 'Utrecht', '3521 AB',
   '🎮', 'linear-gradient(135deg,#f7b733,#fc4a1a)', 4.9, 31, '2026-07-18', '2026-09-01', 'Mike', false),

  ('ladder', 'Ladder 3-delig aluminium',
   'Stevige 3-delige aluminium reformladder van Altrex, werkhoogte tot 7 meter. Voor schilderen of dakgoot schoonmaken.',
   6, 'others', 'Gebruikt', 'Leidsche Rijn', '3541 EH',
   '🪜', 'linear-gradient(135deg,#8d99ae,#bfc9d4)', 4.5, 12, '2026-07-22', '2026-07-29', 'Fatima', false),

  ('elektrische-gitaar', 'Elektrische gitaar | Model 465',
   'Elektrische gitaar (Yamaha Pacifica) inclusief kleine oefenversterker en kabel. Leuk om uit te proberen voor je er zelf één koopt.',
   10, 'music-instruments', 'Goed', 'Utrecht', '3511 LX',
   '🎸', 'linear-gradient(135deg,#6a5acd,#b0a6e8)', 5.0, 8, '2026-07-25', '2026-07-28', 'Daan', false),

  ('grasmaaier', 'Grasmaaier Bosch Rotak 34',
   'Elektrische grasmaaier van Bosch met 40 liter opvangbak en 30 meter verlengsnoer. Voor kleine en middelgrote tuinen.',
   7, 'garden-tools', 'Goed', 'Vleuten', '3451 GB',
   '🌱', 'linear-gradient(135deg,#33691e,#8bc34a)', 4.3, 14, '2026-07-19', '2026-07-26', 'Peter', false),

  ('heggenschaar', 'Elektrische heggenschaar',
   'Elektrische heggenschaar van Gardena, 50 cm meslengte. Licht en handig, snoer van 20 meter inbegrepen.',
   5, 'garden-tools', 'Goed', 'Utrecht', '3527 CV',
   '✂️', 'linear-gradient(135deg,#2e7d32,#81c784)', 4.7, 11, '2026-08-01', '2026-08-09', null, true),

  ('nintendo-switch', 'Nintendo Switch + Mario Kart',
   'Nintendo Switch console met twee Joy-Cons, dock en Mario Kart 8 Deluxe. Perfect voor een spelletjesavond of weekendje weg.',
   8, 'gaming', 'Zo goed als nieuw', 'Utrecht', '3582 GT',
   '🕹️', 'linear-gradient(135deg,#c62828,#ef5350)', 4.9, 26, '2026-07-24', '2026-07-27', 'Lisa', false),

  ('saxofoon', 'Saxofoon | Model 90',
   'Altsaxofoon (Yamaha YAS-280) met koffer, riem en drie rieten. Goed onderhouden, mooi warm geluid.',
   12, 'music-instruments', 'Goed', 'Vleuten', '3451 RC',
   '🎷', 'linear-gradient(135deg,#caa04b,#f0d495)', 4.8, 6, '2026-07-26', '2026-08-02', 'Willem', false),

  ('zitzak', 'Zitzak XXL (Fatboy)',
   'Originele Fatboy zitzak in oranje. Extra zitplekken voor een feestje, filmavond of logees.',
   3, 'furniture', 'Goed', 'Utrecht', '3512 JE',
   '🛋️', 'linear-gradient(135deg,#c0392b,#e57368)', 4.2, 7, '2026-07-21', '2026-08-04', 'Anouk', false),

  ('klaptafel-stoelen', 'Klaptafel + 4 klapstoelen',
   'Inklapbare tafel (180 cm) met vier klapstoelen. Zo mee te nemen in de auto — handig voor verjaardagen en buurtborrels.',
   6, 'furniture', 'Gebruikt', 'De Meern', '3453 ME',
   '🪑', 'linear-gradient(135deg,#5d4037,#a1887f)', 4.6, 10, '2026-07-25', '2026-07-28', 'Bram', false),

  ('vouwfiets', 'Vouwfiets (Brompton)',
   'Brompton vouwfiets, 3 versnellingen. Handig voor bezoek dat met de trein komt of een dagje er op uit.',
   10, 'others', 'Goed', 'Utrecht', '3511 AD',
   '🚲', 'linear-gradient(135deg,#1565c0,#64b5f6)', 4.7, 19, '2026-07-20', '2026-08-10', 'Ingrid', false)

on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  price_per_day = excluded.price_per_day,
  category = excluded.category,
  condition = excluded.condition,
  city = excluded.city,
  postcode = excluded.postcode,
  emoji = excluded.emoji,
  bg = excluded.bg,
  rating = excluded.rating,
  rating_count = excluded.rating_count,
  available_from = excluded.available_from,
  available_to = excluded.available_to,
  owner_name = excluded.owner_name,
  is_anonymous = excluded.is_anonymous;
