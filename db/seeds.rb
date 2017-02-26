# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#pharmacies
Pharmacy.create(name: 'Аптека №1', address: 'Восставших, 1', phone: '54-44-65', worktime: 'круглосуточно', area: 'Ленинский')
Pharmacy.create(name: 'АВиК', address: 'Нахимова, 10', phone: '65-34-21', worktime: '8.00 - 19.00', area: 'Ленинский')
Pharmacy.create(name: 'Le+', address: 'Острякова, 5б', phone: '55-41-71', worktime: 'круглосуточно', area: 'Ленинский')
Pharmacy.create(name: 'Аптека №22', address: 'Острякова, 155а', phone: '65-37-10', worktime: '8.00 - 22.00', area: 'Ленинский')
Pharmacy.create(name: 'АВК', address: 'Сталинграда, 28', phone: '26-45-77', worktime: '7.00 - 19.00', area: 'Гагаринский')
Pharmacy.create(name: 'Аптека №23', address: 'Ульянова, 2', phone: '24-25-87', worktime: 'круглосуточно', area: 'Гагаринский')
Pharmacy.create(name: 'Аптечный пункт', address: 'Маринеско, 23', phone: '21-28-91', worktime: '7.00 - 22.00', area: 'Гагаринский')
Pharmacy.create(name: 'Тонус+', address: 'Октябрьской революции, 44', phone: '26-55-00', worktime: '8.00 - 22.00', area: 'Гагаринский')
Pharmacy.create(name: 'АВиК', address: 'Героев Севастополя, 25', phone: '79-97-12', worktime: 'круглосуточно', area: 'Нахимовский')
Pharmacy.create(name: 'АВиК', address: 'Захарова, 4', phone: '97-38-29', worktime: 'круглосуточно', area: 'Нахимовский')
Pharmacy.create(name: 'Аптечный курьер', address: 'Гранатная, 1', phone: '97-45-99', worktime: '9.00 - 20.00', area: 'Нахимовский')
Pharmacy.create(name: 'АВиК', address: 'Мельника, 15а', phone: '97-12-13', worktime: '9.00 - 18.00', area: 'Нахимовский')
Pharmacy.create(name: 'Добрый доктор', address: '1 Мая, 1', phone: '84-44-88', worktime: 'круглосуточно', area: 'Балаклавский')
Pharmacy.create(name: 'АВК', address: 'Новикова, 28', phone: '84-96-65', worktime: '7.00 - 21.00', area: 'Балаклавский')
Pharmacy.create(name: 'Аптека №24', address: '1 Мая, 4', phone: '84-43-15', worktime: '7.00 - 20.00', area: 'Балаклавский')

#main groups
AtcGroup.create(code: 'A', description: 'Пищеварительный тракт и обмен веществ')
AtcGroup.create(code: 'B', description: 'Кроветворение и кровь')
AtcGroup.create(code: 'C', description: 'Сердечно-сосудистая система')
AtcGroup.create(code: 'D', description: 'Дерматологические препараты')
AtcGroup.create(code: 'G', description: 'Mочеполовая система и половые гормоны')
AtcGroup.create(code: 'H', description: 'Гормональные препараты для системного использования, исключая половые гормоны')
AtcGroup.create(code: 'J', description: 'Противомикробные препараты для системного применения')
AtcGroup.create(code: 'L', description: 'Противоопухолевые препараты и иммуномодуляторы')
AtcGroup.create(code: 'M', description: 'Костно-мышечная система')
AtcGroup.create(code: 'N', description: 'Нервная система')
AtcGroup.create(code: 'P', description: 'Противопаразитарные препараты, инсектициды и репелленты')
AtcGroup.create(code: 'R', description: 'Дыхательная система')
AtcGroup.create(code: 'S', description: 'Органы чувств')
AtcGroup.create(code: 'W', description: 'Прочие препараты')

#sub groups
AtcSubGroup.create(code: 'A10', description: 'Препараты для лечения сахарного диабета', atc_group_id: 1);
AtcSubGroup.create(code: 'A11', description: 'Витамины', atc_group_id: 1);

AtcSubGroup.create(code: 'B02', description: 'Гемостатические препараты', atc_group_id: 2);
AtcSubGroup.create(code: 'B03', description: 'Антианемические препараты', atc_group_id: 2);

AtcSubGroup.create(code: 'C01', description: 'Препараты для лечения заболеваний сердца', atc_group_id: 3);
AtcSubGroup.create(code: 'C03', description: 'Диуретики', atc_group_id: 3);

AtcSubGroup.create(code: 'D03', description: 'Препараты для лечения ран и язв', atc_group_id: 4);
AtcSubGroup.create(code: 'D08', description: 'Антисептики и дезинфицирующие препараты', atc_group_id: 4);

AtcSubGroup.create(code: 'G03', description: 'Половые гормоны и модуляторы половой системы', atc_group_id: 5);
AtcSubGroup.create(code: 'G04', description: 'Препараты для лечения урологических заболеваний', atc_group_id: 5);

AtcSubGroup.create(code: 'H01', description: 'Гормоны гипоталамуса, гипофиза и их аналоги', atc_group_id: 6);
AtcSubGroup.create(code: 'H03', description: 'Препараты для лечения заболеваний щитовидной железы', atc_group_id: 6);

AtcSubGroup.create(code: 'J01', description: 'Антибактериальные препараты системного назначения', atc_group_id: 7);
AtcSubGroup.create(code: 'J05', description: 'Противовирусные препараты системного применения', atc_group_id: 7);

AtcSubGroup.create(code: 'L01', description: 'Противоопухолевые препараты', atc_group_id: 8);
AtcSubGroup.create(code: 'L03', description: 'Иммуностимуляторы', atc_group_id: 8);

AtcSubGroup.create(code: 'M01', description: 'Противовоспалительные и противоревматические препараты', atc_group_id: 9);
AtcSubGroup.create(code: 'M03', description: 'Миорелаксанты', atc_group_id: 9);

AtcSubGroup.create(code: 'N02', description: 'Анальгетики', atc_group_id: 10);
AtcSubGroup.create(code: 'N03', description: 'Противоэпилептические препараты', atc_group_id: 10);

AtcSubGroup.create(code: 'P01', description: 'Противопротозойные препараты', atc_group_id: 11);
AtcSubGroup.create(code: 'P02', description: 'Противогельминтные препараты', atc_group_id: 11);

AtcSubGroup.create(code: 'R01', description: 'Назальные препараты', atc_group_id: 12);
AtcSubGroup.create(code: 'R02', description: 'Препараты для лечения заболеваний горла', atc_group_id: 12);

AtcSubGroup.create(code: 'S01', description: 'Препараты для лечения заболеваний глаз', atc_group_id: 13);
AtcSubGroup.create(code: 'S02', description: 'Препараты для лечения заболеваний уха', atc_group_id: 13);

AtcSubGroup.create(code: 'V01', description: 'Аллергены', atc_group_id: 14);
AtcSubGroup.create(code: 'V06', description: 'Препараты питания', atc_group_id: 14);

#medicines
Medicine.create(name: 'Видестим', 
				form: 'Мазь', 
				package: 'Туба', 
				comment: 'Мазь наружного применения, светло-желтого цвета. Витамин А',
				atc_sub_group_id: 2)

Medicine.create(name: 'Аскорбиновая кислота', 
				form: 'Таблетки', 
				package: 'Не указано', 
				comment: 'Таблетки белого цвета, кислого вкуса', 
				atc_sub_group_id: 2)

Medicine.create(name: 'Йод', 
				form: 'Раствор', 
				package: 'Флакон', 
				comment: 'Флакон 10мл для наружного применения содержит йода 0,1г, калия йодида 0,3г, спирта поливинилового 0,9г', 
				atc_sub_group_id: 12)