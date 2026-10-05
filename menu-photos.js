/* menu-photos.js — Puff 'n Stuff dish-photo catalog (source of truth)
 *
 * This is the curated MENU_PHOTOS catalog + matching logic that used to live
 * inside seo-to-csv-converter.html. It was moved here on 2026-10-05 when the
 * converter was replaced with the CSV/bar/contact version, which no longer
 * embeds dish photos. The menu-lookbook build reads MENU_PHOTOS / photoForItem
 * from THIS file. Nothing on the site loads this file at runtime.
 * Photos are hosted at img/menu/<slug>.jpg.
 */
const DESSERT_NAME = /dessert shooter|fruit tart|molten cake|bread pudding|french toast|\b(cake|brownie|cookie|macaron|cannoli|gelato|affogato|tart|cupcake|s'?mores|mousse|cheesecake|pie|parfait|sundae|sorbet|dessert|churro|donut|doughnut|beignet|truffle|pastry|eclair)\b/i;
const SALAD_NAME = /\bsalad\b|caprese|crudite/i;

// ---- menu photo catalog (curated pro shots, hosted at img/menu/) ----
const MENU_PHOTOS = [
  {slug:"petite-macarons",name:"Petite Macarons",aliases:["Petite Macarons","Macarons"]},
  {slug:"grown-up-macaron",name:"Grown Up Macarons",aliases:["Grown Up Macarons","Grown Up Macaron","Grown-Up Macarons"]},
  {slug:"okey-dokey-artichokey",name:"Okey Dokey Artichokey",alts:["okey-dokey-artichokey-2"],aliases:["Okey Dokey Artichokey","Spinach Artichoke Dip","Artichoke Dip"]},
  {slug:"charcuterie",name:"Charcuterie",alts:["charcuterie-2"],aliases:["Charcuterie","Charcuterie Board","Charcuterie Display","Grazing"]},
  {slug:"cheese-display",name:"Cheese Display",aliases:["Cheese Display","Cheese Board","Artisanal Cheese"]},
  {slug:"black-bleu-meatball",name:"Black & Bleu Meatball",alts:["black-bleu-meatball-2"],aliases:["Black & Bleu Meatball","Black and Bleu Meatball","Black Bleu Meatball","Bacon Wrapped Meatballs","Bacon Wrapped Meatball","Bacon Meatball"]},
  {slug:"mini-lobster-roll",name:"Mini Lobster Roll",alts:["mini-lobster-roll-2"],aliases:["Mini Lobster Roll","Lobster Roll"]},
  {slug:"mushroom-taleggio-arancini",name:"Mushroom & Taleggio Arancini",alts:["mushroom-taleggio-arancini-2"],aliases:["Mushroom & Taleggio Arancini","Mushroom Arancini","Arancini"]},
  {slug:"seasonal-bruschetta-fall-winter",name:"Seasonal Bruschetta (Fall/Winter)",alts:["seasonal-bruschetta-fall-winter-2"],aliases:["Fall Winter Bruschetta"]},
  {slug:"seasonal-bruschetta-spring-summer",name:"Seasonal Bruschetta (Spring/Summer)",alts:["seasonal-bruschetta-fall-winter","seasonal-bruschetta-fall-winter-2"],aliases:["Spring Summer Bruschetta"]},
  {slug:"fruit-cheese-display",name:"Traditional Fruit & Cheese Display",aliases:["Traditional Fruit and Cheese","Traditional Fruit & Cheese","Fruit and Cheese Display","Fruit & Cheese Display","Fruit and Cheese","Fruit & Cheese"]},
  {slug:"chips-dips-platter",name:"Chips & Dips Platter",aliases:["Chips & Dips","Chips and Dips"]},
  {slug:"crudites",name:"Crudites",alts:["crudites-2"],aliases:["Crudites","Crudite","Crudite Platter","Vegetable Crudite"]},
  {slug:"deviled-eggs-trio",name:"Deviled Eggs Trio",alts:["deviled-eggs-trio-2"],aliases:["Deviled Eggs Trio","Deviled Egg Trio","Deviled Eggs"]},
  {slug:"shrimp-cocktail",name:"Shrimp Cocktail Platter",alts:["shrimp-cocktail-2"],aliases:["Shrimp Cocktail Platter","Shrimp Cocktail Display","Jumbo Shrimp Cocktail","Classic Chilled Shrimp"]},
  {slug:"smoked-salmon",name:"Smoked Salmon Platter",aliases:["Smoked Salmon Platter","Smoked Salmon Display","Honey Smoked Salmon Platter","Honey Smoked Salmon"]},
  {slug:"tea-sandwiches-platter",name:"Tea Sandwiches Platter",alts:["tea-sandwiches-platter-2"],aliases:["Tea Sandwiches","Tea Sandwich"]},
  {slug:"traditional-cheese-display",name:"Traditional Cheese Display",aliases:["Traditional Cheese","Traditional Cheese Display"]},
  {slug:"morning-breads-danish-muffins",name:"Morning Breads, Danish & Muffins",aliases:["Assorted Pastries","Pastries & Croissants","Pastries","Danish","Muffins"]},
  {slug:"french-toast-bread-pudding",name:"French Toast Bread Pudding",alts:["french-toast-bread-pudding-2"],aliases:["French Toast Bread Pudding"]},
  {slug:"fresh-house-blended-juices",name:"Fresh House Blended Juices",aliases:["Fresh House Blended Juices","House Blended Juices","Blended Juices","Juice Blends","Creative Juices","House Craft Juices"]},
  {slug:"breakfast-sandwich",name:"Breakfast Sandwich",aliases:["Breakfast Sandwich","Croissant Breakfast Sandwich","Bagel Breakfast Sandwich"]},
  {slug:"frittata",name:"Frittata",alts:["frittata-2", "frittata-3"],aliases:["Frittata"]},
  {slug:"fresh-fruit-display",name:"Fresh Fruit Salad",alts:["fresh-fruit-display-2"],aliases:["Fresh Fruit Salad","Fruit Salad"]},
  {slug:"mixed-berry-parfait",name:"Mixed Berry Parfait",aliases:["Parfait","Yogurt Parfait","Mixed Berry Parfait","Parfaits"]},
  {slug:"applewood-smoked-bacon",name:"Applewood Smoked Bacon",alts:["applewood-smoked-bacon-2"],aliases:["Applewood Smoked Bacon","Applewood Bacon","Smoked Bacon Strips"]},
  {slug:"grilled-ham",name:"Grilled Ham",alts:["grilled-ham-2"],aliases:["Grilled Ham"]},
  {slug:"avocado-toast",name:"Avocado Toast",aliases:["Avocado Toast","Avo Toast"]},
  {slug:"avocado-spread",name:"Avocado Spread",aliases:["Avocado Spread","Avocado Dip"]},
  {slug:"biscuits-jam",name:"Biscuits & Jam",aliases:["Biscuits & Jam","Biscuits and Jam","Biscuits"]},
  {slug:"individual-quiche",name:"Individual Quiche",alts:["individual-quiche-2"],aliases:["Individual Quiche","Quiche"]},
  {slug:"85c-short-rib",name:"85C Short Rib",alts:["85c-short-rib-2"],aliases:["85 Degree Short Rib","85°C Short Rib","Braised Short Rib","Short Rib"]},
  {slug:"gourmet-cookie-sandwiches",name:"Gourmet Cookie Sandwiches",aliases:["Gourmet Cookie Sandwiches","Cookie Sandwich","Chocolate Chip Cookie Sandwich"]},
  {slug:"brownie",name:"Brownie",aliases:["Double Chocolate Brownie","Brownie"]},
  {slug:"pie-in-a-jar",name:"Pie in a Jar",alts:["pie-in-a-jar-2"],aliases:["Pie in a Jar","Apple Pie in a Jar","Banana Pudding Jar"]},
  {slug:"potato-chips",name:"Potato Chips",alts:["potato-chips-2"],aliases:["Potato Chips","Fresh Potato Chips","Chips"]},
  {slug:"sides-display",name:"Sides Display",fallback:"entree",aliases:[
    "Fire Roasted Vegetables","Roasted Vegetables","Roasted Seasonal Vegetables","Char Grilled Vegetables","Grilled Vegetables","Seasonal Vegetables",
    "Rice Pilaf","Wild Rice","Yellow Rice","Coconut Rice","Jasmine Rice","Basmati Rice","Saffron Rice",
    "Fondant Potatoes","Smashed Potatoes","Potato Puree","Duchess Potatoes",
    "Chive Mash","Garlic Mashed Potatoes","Yukon Mashed Potatoes",
    "Charred Broccoli","Roasted Broccoli",
    "Grilled Asparagus","Roasted Asparagus",
    "Glazed Carrots","Honey Glazed Carrots","Roasted Carrots",
    "Farro Pilaf","Quinoa Pilaf","Grain Pilaf","Creamed Spinach","Grilled Corn","Street Corn","Elote"
  ]},
  {slug:"charred-brussels",name:"Charred Brussels Sprouts",aliases:["Charred Brussels Sprouts","Roasted Brussels Sprouts","Brussels Sprouts","Brussels"]},
  {slug:"roasted-baby-potatoes",name:"Roasted Baby Potatoes",alts:["roasted-baby-potatoes-2"],aliases:["Petite Rainbow Potatoes","Rainbow Potatoes","Roasted Baby Potatoes","Basted Potatoes","Roasted Potatoes","Herb Roasted Potatoes","Smoky Fingerling Potatoes","Fingerling Potatoes"]},
  {slug:"green-beans",name:"Green Beans",aliases:["Classic Green Beans","Green Beans","Haricot Verts","French Green Beans"]},
  {slug:"country-dressing",name:"Country Bread Dressing",aliases:["Toasted Country Bread Dressing","Country Bread Dressing","Bread Dressing","Cornbread Dressing","Herb Dressing","Stuffing"]},
  {slug:"roasted-yams",name:"Roasted Yams",aliases:["Roasted Yams","Candied Yams","Yams","Marshmallow Sweet Potato","Sweet Potato Casserole"]},
  {slug:"turkey-breast",name:"Turkey Breast",aliases:["Turkey Breast","Bone-In Turkey Breast","Rosemary & Thyme Turkey","Roasted Turkey","Roast Turkey Breast","Sliced Turkey"]},
  {slug:"baked-ham",name:"Sliced Baked Ham",aliases:["Sliced Slow Baked Ham","Slow Baked Ham","Baked Ham","Holiday Ham","Glazed Ham","Hickory Smoked Ham","Sliced Ham"]},
  {slug:"holiday-buffet",name:"Holiday Buffet",aliases:["Holiday Buffet","Holiday Dinner Buffet","Holiday Spread","Thanksgiving Buffet"]},
  {slug:"raspberry-cheesecake",name:"Raspberry Swirl Cheesecake",aliases:["White Chocolate Raspberry Swirl Cheesecake","Raspberry Swirl Cheesecake","White Chocolate Raspberry Cheesecake","Raspberry Cheesecake"]},
  {slug:"pumpkin-cheesecake",name:"Pumpkin Cheesecake",aliases:["Pumpkin Cheesecake Bites","Pumpkin Cheesecake Bite","Pumpkin Cheesecake"]},
  {slug:"pecan-tart",name:"Chocolate Pecan Tart",aliases:["Chocolate Pecan Tart","Pecan Tart","Maple Pecan Tart"]},
  {slug:"peppermint-cookies",name:"Peppermint Chocolate Cookies",aliases:["Peppermint and Chocolate Chunk Cookies","Peppermint Chocolate Cookies","Peppermint Crinkle Cookies","Peppermint Cookies","Chocolate Peppermint Cookies","Crinkle Cookies"]},
  {slug:"apple-dessert-shooter",name:"Apple Spiced Shooter",aliases:["Apple Dessert Shooter","Apple Spiced Torte Bite","Apple Spiced Shooter","Apple Spice Shooter","Caramel Apple Shooter","Apple Torte Bite"]},
  {slug:"mistletoe-margarita",name:"Mistletoe Margarita",aliases:["Mistletoe Margarita","Cranberry Margarita","Holiday Margarita","Winter Margarita","White Cranberry Margarita"]},
  {slug:"pork-loin",name:"Pork Loin",aliases:["Pork Loin","Roasted Pork Loin","Herb Roasted Pork Loin","Sliced Pork Loin"]},
  {slug:"apple-pie",name:"Apple Pie",aliases:["Classic Apple Pie","Apple Pie"]},
  {slug:"pumpkin-chiffon-pie",name:"Pumpkin Chiffon Pie",aliases:["Pumpkin Chiffon Pie","Pumpkin Chiffon","Pumpkin Pie"]},
  {slug:"turtle-cheesecake",name:"Turtle Cheesecake",aliases:["Turtle Cheesecake","Caramel Pecan Cheesecake"]},
  {slug:"pumpkin-pie-martini",name:"Pumpkin Pie Martini",aliases:["Pumpkin Pie Martini","Pumpkin Martini"]},
  {slug:"apple-cider-bourbon",name:"Apple Cider Bourbon",aliases:["Apple Cider Bourbon","Apple Cider Cocktail","Cider Bourbon"]},
  {slug:"caprese-flatbread",name:"Caprese Flatbread",aliases:["Caprese Flatbread","Caprese Flat Bread","Tomato Mozzarella Flatbread"]},
  {slug:"ginger-cookie-sandwich",name:"Ginger Cookie Sandwich",aliases:["Ginger Cookie Sandwich","Gingersnap Cookies","Gingersnap Cookie","Ginger Cookies","Gingersnap"]},
  {slug:"apple-guava-hand-pie",name:"Apple Guava Hand Pie",aliases:["Mini Apple Guava Hand Pie","Apple Guava Hand Pie","Guava Hand Pie","Hand Pie"]},
  {slug:"maple-pecan-pie",name:"Maple Bourbon Pecan Pie",aliases:["Maple Bourbon Pecan Pie","Maple Pecan Pie","Bourbon Pecan Pie","Pecan Pie"]},
  {slug:"ginger-ganache-brownie",name:"Ginger Swirl Ganache Brownie",aliases:["Ginger Swirl Ganache Brownie","Ginger Ganache Brownie","Ganache Brownie","Ginger Brownie"]},
  {slug:"beef-tenderloin",name:"Beef Tenderloin",alts:["beef-tenderloin-3"],aliases:["Beef Tenderloin","Roasted Beef Tenderloin","Peppercorn Beef Tenderloin","Peppercorn Crusted Beef Tenderloin","Sliced Tenderloin"]},
  {slug:"tenderloin-minis-platter",name:"Tenderloin Minis Platter",aliases:["Tenderloin Minis Platter","Tenderloin Minis","Beef Tenderloin Minis"]},
  {slug:"romesco-chicken",name:"Romesco Chicken",aliases:["Romesco Chicken","Romesco Baked Chicken"]},
  {slug:"pork-verde",name:"Pork Verde",aliases:["Pork Verde","Salsa Verde Pork","Pork Chile Verde"]},
  {slug:"meatloaf",name:"Southwest Meatloaf",aliases:["Southwest Meatloaf","Meatloaf"]},
  {slug:"shrimp-ssam",name:"Shrimp Ssam",aliases:["Shrimp Ssam","Ssam"]},
  {slug:"herb-chicken",name:"Herb Chicken",aliases:["Herb Chicken","Herb Roasted Chicken","Herb Grilled Chicken"]},
  {slug:"greek-salad",name:"Greek Salad",aliases:["Greek Salad"]},
  {slug:"cobbler",name:"Seasonal Cobbler",aliases:["Seasonal Cobbler","Fruit Cobbler","Cobbler"]},
  {slug:"crumb-cake",name:"Blueberry Lemon Crumb Cake",aliases:["Blueberry Lemon Crumb Cake","Crumb Cake","Lemon Crumb Cake"]},
  {slug:"torta-espanola",name:"Torta Espanola",aliases:["Torta Espanola","Torta Espana","Spanish Tortilla","Torta de Espana"]},
  {slug:"chocolate-chip-cookie",name:"Chocolate Chip Cookie",aliases:["Chocolate Chip Cookie","Chocolate Chip Cookies"]},
  {slug:"salmon-toast",name:"Smoked Salmon Toast",alts:["salmon-toast-2", "salmon-toast-3"],aliases:["Smoked Salmon Toasts","Smoked Salmon Toast","Salmon Toast","Salmon Crostini"]},
  {slug:"vegetarian-pasta-salad",name:"Vegetarian Pasta Salad",aliases:["Vegetarian Pasta Salad","Vegetable Pasta Salad","Pasta Salad"]},
  {slug:"our-double-chocolate-brownie",name:"Double Chocolate Brownie",aliases:["Our Double Chocolate Brownie","Double Chocolate Brownie","Fudge Brownie"]},
  {slug:"breakfast-burrito",name:"Breakfast Burrito",aliases:["Breakfast Burrito","Egg Burrito","Chorizo Burrito","Breakfast Taco"]},
  {slug:"breakfast-potatoes",name:"New England Style Breakfast Potato",aliases:["New England Style Breakfast Potato","New England Style Breakfast Potatoes","New England Breakfast Potato"]},
  {slug:"cinnamon-rolls",name:"Cinnamon Rolls",aliases:["Cinnamon Rolls","Cinnamon Roll"]},
  {slug:"monkey-bread",name:"Monkey Bread",aliases:["Monkey Bread"]},
  {slug:"housemade-bars",name:"Housemade Bars",aliases:["Housemade Bars","House Made Bars","Breakfast Bars"]},
  {slug:"lox-board",name:"Lox Board",aliases:["Lox Board","Salmon Lox","Bagel and Lox","Bagels & Lox"]},
  {slug:"hummus-display",name:"Hummus Display",alts:["hummus-display-2"],aliases:["Hummus Display","Classic Hummus","Hummus"]},
  {slug:"tzatziki",name:"Tzatziki",aliases:["Tzatziki","Tzatziki Dip"]},
  {slug:"zucchini-squash",name:"Zucchini & Squash",aliases:["Zucchini & Squash","Zucchini and Squash","Grilled Zucchini","Summer Squash","Zucchini Squash"]},
  {slug:"quinoa-rice-blend",name:"Quinoa & Brown Rice Blend",aliases:["Quinoa & Brown Rice Blend","Quinoa and Brown Rice","Quinoa Brown Rice","Quinoa Rice Blend"]},
  {slug:"tricolor-carrots",name:"Roasted Tricolor Carrots",alts:["tricolor-carrots-2"],aliases:["Roasted Tricolor Carrots","Tricolor Carrots","Rainbow Carrots"]},
  {slug:"cilantro-rice",name:"Cilantro Rice",aliases:["Cilantro Lime Rice","Cilantro Rice"]},
  {slug:"roasted-couscous",name:"Roasted Couscous",aliases:["Roasted Couscous","Pearl Couscous","Israeli Couscous","Couscous"]},
  {slug:"basted-red-potato",name:"Basted Red Potatoes",aliases:["Basted Red Potatoes","Basted Red Potato","Red Bliss Potatoes","Butter Herb Potatoes"]},
  {slug:"chive-mashed-potatoes",name:"Chive Mashed Potatoes",aliases:["Chive Mashed","Mashed Potatoes","Whipped Potato"]},
  {slug:"florida-inspired-caesar-salad",name:"Chicory Salad",alts:["florida-inspired-caesar-salad-2"],aliases:["Chicory Salad"]},
  {slug:"salad-buffet",name:"Salad Buffet",aliases:[],fallback:"salad"},
  {slug:"chilled-watermelon",name:"Tomato, Watermelon & Feta Salad",alts:["tomato-watermelon-feta-salad"],aliases:["Watermelon Tomato Salad","Tomato Watermelon Salad","Tomato Watermelon","Watermelon Salad","Tomato, Watermelon & Feta Salad","Tomato, Watermelon & Feta","Summer Tomatoes, Feta & Watermelon Salad","Watermelon Feta Salad","Watermelon & Feta"]},
  {slug:"winter-greens",name:"Winter Greens",alts:["winter-greens-2"],aliases:["Winter Greens Salad","Winter Greens"]},
  {slug:"smoked-ham-swiss-sandwich",name:"Smoked Ham & Swiss Sandwich",aliases:["Ham & Swiss","Smoked Ham","Ham Sandwich"]},
  {slug:"slow-roast-beef-sandwich",name:"Slow Roast Beef Sandwich",aliases:["Slow Roast Beef","Roast Beef Sandwich","Roast Beef"]},
  {slug:"sandwich-buffet",name:"Sandwich Buffet",aliases:[],fallback:"sandwich"},
  {slug:"turkey-provolone-sandwich",name:"Turkey & Provolone Sandwich",alts:["turkey-provolone-sandwich-2"],aliases:["Turkey & Provolone","Turkey Provolone","Turkey Sandwich"]},
  {slug:"berries-and-greens-salad",name:"Berries and Greens Salad",aliases:["Berries and Greens","Berries & Greens Salad"]},
  {slug:"beignets",name:"Beignets",alts:["pbj-beignet"],aliases:["Beignets","Beignet"]},
  {slug:"seasonal-crostini-display",name:"Seasonal Crostini Display",aliases:["Seasonal Crostini Display","Crostini Display"]},
  {slug:"caviar",name:"Caviar",aliases:["Caviar","Hackleback Caviar"]},
  {slug:"cuban-cigars",name:"Cuban Cigars",aliases:["Cuban Cigars","Cuban Cigar","Cigars"]},
  {slug:"grain-bowl",name:"Build-Your-Own Bowl",aliases:["Build-Your-Own Bowl","Build Your Own Salad Bowl","Grain Bowl","Salad Bowl"]},
  {slug:"espresso-martini",name:"Espresso Martini",aliases:["Espresso Martini"]},
  {slug:"champagne-chicken",name:"Pan Roasted Frenched Chicken Champagne",aliases:["Pan Roasted Frenched Chicken Champagne","Frenched Chicken Champagne","Champagne Chicken"]},
  {slug:"rice-crispy-station",name:"Rice Crispy Bar Station",aliases:["Rice Crispy Bar Station","Rice Crispy Station","Rice Crispy Treat"]},
  {slug:"smores-station",name:"S'mores Station",aliases:["S'mores Station","Smores Station","S'mores","Smores"]},
  {slug:"petite-lamb-chop",name:"Petite Lamb Chop",aliases:["Petite Lamb Chop","Lamb Chop"]},
  {slug:"penne-alla-vodka",name:"Penne Alla Vodka",aliases:["Penne Alla Vodka","Penne Vodka","Penne"]},
  {slug:"turkey-reuben",name:"Roast Turkey Reuben",aliases:["Roast Turkey Reuben","Turkey Reuben","Reuben"]},
  {slug:"seared-scallops",name:"Seared Jumbo Scallops",aliases:["Seared Jumbo Scallops","Jumbo Scallops","Seared Scallops","Seared Scallop"]},
  {slug:"bacon-scallop",name:"Bacon Scallop",aliases:["Bacon Wrapped Scallop","Bacon Braised Scallop","Bacon Jam Scallop","Maple Bacon Scallop","Scallops Bacon","Scallop and Bacon","Scallop with Bacon","Bacon Scallop"]},
  {slug:"dessert-shooter",name:"Black Forest Shooter",aliases:["Black Forest Shooter","Black Forest Cake Shooter","Chocolate Cherry Shooter","Black Forest","Dessert Shooter","Dessert Shooters"]},
  {slug:"petite-potato",name:"Petite Twice-Baked Potato",aliases:["Petite Twice Baked Potato","Mini Twice Baked Potatoes","Twice Baked Potatoes","Twice Baked Potato","Petite Potato","Stuffed Petite Potato","Loaded Petite Potato","Duchess Potato","Mini Baked Potato"]},
  {slug:"bagel-bar",name:"Bagel Bar",aliases:["Bagel Bar","Bagel Display","Bagel Station","Assorted Bagels","Bagels & Spreads","Bagels and Spreads"]},
  {slug:"crab-cake-benedict",name:"Crab Cake Benedict",aliases:["Crab Cake Benedict","Crab Cake Eggs Benedict","Crab Benedict"]},
  {slug:"flatbread",name:"Sun-Dried Tomato Flatbread",aliases:["Sun-Dried Tomato Flatbread","Sundried Tomato Flatbread","Tomato Flatbread","Margherita Flatbread","Artisan Flatbread","Flatbreads","Flatbread"]},
  {slug:"chicken-satay",name:"Chicken Satay",aliases:["Chicken Satay","Thai Chicken Satay","Satay Skewer","Satay"]},
  {slug:"chicken-waffle",name:"Chicken & Waffle",aliases:["Chicken & Waffle","Chicken and Waffle","Chicken & Waffles","Chicken Waffle","Chicken & Waffles Florida Style"]},
  {slug:"butternut-ravioli",name:"Butternut Squash Ravioli",aliases:["Butternut Squash Ravioli","Squash Ravioli","Butternut Ravioli","Pumpkin Ravioli","Ravioli"]},
  {slug:"taco-station",name:"Taco Station",aliases:["Taco Station","Taco Bar","Build Your Own Taco","Street Taco","Street Tacos","Taco Display"]},
  {slug:"steak-skewer",name:"Steak Skewer",aliases:["Steak Skewer","Chimichurri Steak","Beef Skewer","Steak Brochette","Churrasco"]},
  {slug:"mango-margarita",name:"Mango Chili Margarita",aliases:["Mango Chili Margarita","Mango Chile Margarita","Spicy Mango Margarita","Chili Mango Margarita","Mango Margarita"]},
  {slug:"chicken-puttanesca",name:"Chicken Puttanesca",aliases:["Chicken Puttanesca","Puttanesca","Pan Roasted Frenched Chicken"]},
  {slug:"molten-cake",name:"Molten Chocolate Cake",aliases:["Molten Chocolate Cake","Molten Cake","Chocolate Molten Cake","Chocolate Lava Cake","Lava Cake","S'mores Molten Cake"]},
  {slug:"cannoli-bar",name:"Cannoli Bar",aliases:["Cannoli Bar","Cannoli Display","Cannoli Station","Assorted Cannoli"]},
  {slug:"chili-chips",name:"Chili Dusted Chips",aliases:["Chili Dusted Chips","Chili Chips","Chili Lime Chips","Spiced Chips","House-Made Chips"]},
  {slug:"brownie-shooter",name:"Brownie Shooter",aliases:["Brownie Shooter","Chocolate Brownie Shooter","Brownie Cup"]},
  {slug:"tomahawk",name:"Tomahawk",alts:["tomahawk-2"],aliases:["Tomahawk"]},
  {slug:"holiday-tomahawk",name:"Tomahawk Steak (Carving)",alts:["tomahawk","tomahawk-2"],aliases:["Tomahawk Steak","Chef Carved Tomahawk"]},
  {slug:"short-rib-lettuce-wrap",name:"Short Rib Lettuce Wrap",aliases:["Short Rib Lettuce Wrap","Lettuce Wrap"]},
  {slug:"tofu-scallop",name:"Tofu Scallops",aliases:["Tofu Scallops","Tofu Scallop","Tofu"]},
  {slug:"vintage-revival",name:"Vintage Revival",aliases:["Vintage Revival"]},
  {slug:"mahi-tostada",name:"Mahi Tostada",aliases:["Mahi Tostada","Mahi"]},
  {slug:"potato-crusted-grouper",name:"Potato Crusted Grouper",aliases:["Potato Crusted Grouper"]},
  {slug:"roasted-lamb",name:"Roasted Lamb",aliases:["Roasted Lamb","Lamb Roast","Lamb Rack","Rack of Lamb"]},
  {slug:"shrimp-risotto",name:"Shrimp Risotto",aliases:["Shrimp Risotto","Shrimp Butternut Squash Risotto","Butternut Squash Risotto"]},
  {slug:"shaved-bresaola-toast",name:"Shaved Bresaola Toast",aliases:["Shaved Bresaola Toast","Bresaola Toast","Bresaola"]},
  {slug:"salmon-nicoise",name:"Salmon Nicoise Salad",aliases:["Salmon Nicoise Salad","Salmon Niçoise Salad","Salmon Nicoise","Salmon Niçoise","Nicoise","Niçoise"]},
  {slug:"quinoa-walnut-porridge",name:"Quinoa Walnut Porridge",aliases:["Quinoa Walnut Porridge","Porridge"]},
  {slug:"vegan-scramble",name:"Vegan Scramble",aliases:["Vegan Scramble","Tofu Scrambler","Tofu Scramble"]},
  {slug:"pea-risotto",name:"Pea Risotto",aliases:["Pea Risotto","Petite Pea Risotto","Sweet Pea Risotto","Pea Puree"]},
  {slug:"pie-in-a-jar-smores",name:"Pie in a Jar S'mores",aliases:["Pie in a Jar Smores","S'mores Pie"]},
  {slug:"signature-soup-collection",name:"Signature Soup Collection",aliases:["Signature Soup Collection","Signature Creamy Basil","Creamy Basil Soup","Soup Collection","Tomato Basil Soup","Soups","Soup"]},
  {slug:"crab-cakes",name:"Crab Cakes",alts:["crab-cakes-2"],aliases:["Crab Cakes","Crab Cake","Jumbo Lump Crab Cake"]},
  {slug:"beef-wellington",name:"Beef Wellington",aliases:["Beef Wellington","Beef Tenderloin Wellington"]},
  {slug:"cauliflower-steak",name:"Cauliflower Steak",aliases:["Cauliflower Steak","Roasted Cauliflower Steak"]},
  {slug:"cobb-salad",name:"Cobb Salad",aliases:["Cobb Salad"]},
  {slug:"roasted-squash-salad",name:"Roasted Squash Salad",alts:["roasted-squash-salad-2"],aliases:["Roasted Squash Salad","Squash Salad","Autumn Squash Salad","Winter Squash Salad","Harvest Salad","Butternut Squash Salad"]},
  {slug:"duck-flatbread",name:"Duck Flatbread",aliases:["Duck Flatbread","Duck Confit Flatbread"]},
  {slug:"herb-de-provence-chicken",name:"Herb de Provence Chicken",aliases:["Herb de Provence Chicken","Herbs de Provence Chicken","Provence Chicken"]},
  {slug:"hearts-of-palm-cake",name:"Hearts of Palm Cake",alts:["hearts-of-palm-cake-2","hearts-of-palm-cake-3"],aliases:["Hearts of Palm Cake","Hearts of Palm"]},
  {slug:"short-rib-eggs-benedict",name:"Short Rib Eggs Benedict",aliases:["Short Rib Eggs Benedict","Short Rib Benedict","Braised Beef Benedict","Eggs Benedict","Benedict"]},
  {slug:"enhanced-cream-cheese",name:"Enhanced Cream Cheese",alts:["enhanced-cream-cheese-2"],aliases:["Enhanced Cream Cheese", "Whipped Cream Cheese"]},
  {slug:"muhammara",name:"Muhammara",aliases:["Muhammara"]},
  {slug:"fire-roasted-eggplant",name:"Fire Roasted Eggplant",aliases:["Fire Roasted Eggplant"]},
  {slug:"smoked-blue-cheese",name:"Smoked Blue Cheese",aliases:["Smoked Blue Cheese"]},
  {slug:"st-andre-herbed-preserves",name:"St. Andre & Herbed Preserves",alts:["st-andre-herbed-preserves-2"],aliases:["St. Andre & Herbed Preserves", "St Andre & Herbed Preserves"]},
  {slug:"cucumber-ribbon",name:"Cucumber Ribbon",aliases:["Cucumber Ribbon", "Cucumber Ribbon Salad"]},
  {slug:"roasted-petite-beets",name:"Roasted Petite Beets",aliases:["Roasted Petite Beets"]},
  {slug:"grilled-endive-salad",name:"Grilled Endive Salad",aliases:["Grilled Endive Salad", "Endive Salad"]},
  {slug:"mushroom-bolognese",name:"Mushroom Bolognese",aliases:["Mushroom Bolognese", "Lentil Bolognese"]},
  {slug:"salmon-pea-risotto",name:"Salmon with Petite Pea Risotto",aliases:["Pan Roasted Atlantic Salmon", "Baked & Flaked Salmon", "Baked and Flaked Salmon"]},
  {slug:"old-fashioned",name:"Old Fashioned",aliases:["Old Fashioned Bar", "Cherry Spiced Old Fashioned", "Old Fashioned"]},
  {slug:"chickpea-fritter",name:"Chickpea Fritter",aliases:["Chickpea Fritter","Chickpea Fritters"]},
  {slug:"berries-greens-starter",name:"Berries & Greens",aliases:["Berries & Greens", "Berries and Greens Starter"]},
  {slug:"whipped-yukon-potatoes",name:"Whipped Yukon Gold Potatoes",aliases:["Whipped Yukon Gold Potatoes", "Whipped Yukon Potatoes", "Whipped Potatoes"]},
  {slug:"oven-roasted-broccolini",name:"Oven Roasted Broccolini",aliases:["Oven Roasted Broccolini","Roasted Broccolini","Charred Broccolini"]},
  {slug:"creamy-polenta",name:"Creamy Polenta",aliases:["Creamy Polenta", "Polenta"]},
  {slug:"roast-chicken-quarter",name:"Roast Chicken Quarter",alts:["roast-chicken-quarter-2"],aliases:["Roast Chicken Quarter"]},
  {slug:"smoked-farro",name:"Smoked Farro",aliases:["Smoked Farro"]},
  {slug:"romanesco",name:"Romanesco",aliases:["Romanesco"]},
  {slug:"breakfast-sausage-links",name:"Breakfast Sausage Links",alts:["breakfast-sausage-links-2"],aliases:["Breakfast Sausage Links", "Breakfast Sausage", "Sausage Links"]},
  {slug:"whipped-feta",name:"Whipped Feta",aliases:["Whipped Feta"]},
  {slug:"mango-pepper-jam",name:"Mango Pepper Jam",aliases:["Mango Pepper Jam"]},
  {slug:"fig-jam",name:"Fig Jam",aliases:["Fig Jam"]},
  {slug:"whole-chicken",name:"Whole Chicken",aliases:["Whole Chicken"]},
  {slug:"ny-strip",name:"NY Strip Steak",aliases:["NY Strip Steak", "New York Strip Steak", "New York Strip"]},
  {slug:"hot-muffaletta",name:"Hot Muffaletta",aliases:["Hot Muffaletta", "Muffaletta", "Muffuletta"]},
  {slug:"sauteed-mushrooms",name:"Sautéed Mushrooms",aliases:["Sautéed Mushrooms", "Sauteed Mushrooms"]},
  {slug:"rainbow-chard",name:"Sautéed Rainbow Chard",aliases:["Sautéed Rainbow Chard", "Rainbow Chard"]},
  {slug:"farro-rice-quinoa",name:"Farro, Brown Rice & Quinoa Blend",aliases:["Farro, Brown Rice & Quinoa Blend", "Farro Brown Rice Quinoa"]},
  {slug:"pbj-beignet",name:"Peanut Butter & Jelly Beignet",alts:["beignets"],aliases:["Peanut Butter & Jelly Beignet","PB&J Beignet","Peanut Butter and Jelly Beignet"]},
  {slug:"holiday-roasted-salmon",name:"Roasted Salmon",aliases:["Roasted Salmon"]},
  {slug:"sweet-pumpkin-pies",name:"Individual Sweet Pumpkin Pies",aliases:["Individual Sweet Pumpkin Pies", "Individual Sweet Pumpkin Pie", "Sweet Pumpkin Pies", "Sweet Pumpkin Pie", "Mini Pumpkin Pies"]},
  {slug:"maple-root-vegetables",name:"Maple Glazed Roasted Root Vegetables",aliases:["Maple Glazed Roasted Root Vegetables", "Roasted Root Vegetables", "Maple Glazed Root Vegetables"]},
  {slug:"risotto-cake",name:"Risotto Cake",aliases:["Risotto Cake","Crispy Risotto Cake","Parmesan Risotto Cake"]},
  {slug:"florida-caesar",name:"Florida Inspired Caesar Salad",aliases:["Florida Inspired Caesar Salad","Florida Inspired Caesar","Florida Caesar Salad","Florida Caesar"]},
  {slug:"smashed-potatoes",name:"Smashed Potatoes",alts:["smashed-potatoes-2"],aliases:["Smashed Potatoes for Breakfast","Smashed Potatoes","Breakfast Smashed Potatoes"]},
  {slug:"hoisin-short-rib",name:"Braised Short Ribs with Hoisin",aliases:["Braised Short Ribs with Hoisin Sauce","Hoisin Short Rib","Hoisin Braised Short Rib"]},
  {slug:"rustic-quiche",name:"Rustic Quiche",alts:["rustic-quiche-2"],aliases:["Rustic Quiche"]},
  {slug:"omelette",name:"Omelette Station",alts:["omelette-2"],aliases:["Omelette","Omelet","Omelette Station","Omelet Station","Made to Order Omelette"]},
  {slug:"acai-bowl",name:"Acai Bowl",aliases:["Acai Bowl","Açaí Bowl","Acai"]},
  {slug:"mini-cupcakes",name:"Mini Cupcakes",aliases:["Mini Cupcakes","Mini Cupcake","Cupcake Platter","Assorted Cupcakes","Cupcakes"]},
  {slug:"apple-cranberry-tart",name:"Apple Cranberry Tart",aliases:["Apple Cranberry Tart","Cranberry Tart"]},
  {slug:"affogato",name:"Affogato",aliases:["Affogato"]},
  {slug:"walking-cannoli",name:"Walking Cannoli",aliases:["Walking Cannoli","Cannoli"]},
  {slug:"paloma-cocktail",name:"Paloma",aliases:["Paloma"]},
  {slug:"blackberry-mojito",name:"Blackberry Mojito",aliases:["Blackberry Mojito"]},
  {slug:"jalapeno-passion-margarita",name:"Jalapeno Passion Fruit Margarita",aliases:["Jalapeño Passion Fruit Margarita","Jalapeno Passion Fruit Margarita","Passion Fruit Margarita","Margarita Bar"]},
  {slug:"pacific-rim-cocktail",name:"Pacific Rim",aliases:["Pacific Rim"]},
  {slug:"moscow-mule",name:"Moscow Mule",aliases:["Moscow Mule"]},
  {slug:"roast-salmon-citrus",name:"Roast Salmon with Citrus",aliases:["Roast Salmon with Citrus","Citrus Salmon","Coconut-Chile Salmon","Roast Salmon Citrus & Coconut-Chile Crunch","Coconut-Chile Crunch"]}
];
const _menuFb = role => (MENU_PHOTOS.find(p=>p.fallback===role)||{}).slug || null;
function menuNorm(s){ return " "+String(s||"").toLowerCase().replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()+" "; }
// best photo for a menu item: longest alias phrase that appears (whole-word) in the item, else a section fallback
const MENU_NO_PHOTO=["caviar on housemade potato chip","greek salad with shrimp","beef tenderloin toast","pan roasted beef tenderloin","wild mushroom ravioli","short rib cube","pan roasted salmon","nicoise inspired tuna salad sandwich","beef tenderloin crostini"];
function photoForItem(name, sectionTitle, desc){
  const it=menuNorm(name);
  // items where the closest photo would misrepresent the dish (e.g. missing the protein) — show none
  if(MENU_NO_PHOTO.indexOf(it.trim())>=0) return null;
  // seasonal bruschetta: pick the photo by the season word in the item (either word order)
  if(it.indexOf(" bruschetta ")>=0){
    // pick by season word OR signature topping; if neither, skip rather than guess
    const bt=menuNorm((name||"")+" "+(desc||""));
    if(/ spring | summer |tomato|watermelon|peach|corn|berr|strawberr|burrata|heirloom|basil/.test(bt)) return "seasonal-bruschetta-spring-summer";
    if(/ fall | winter | autumn |squash|butternut|pear|apple|cranberr|\bfig\b|mushroom|pumpkin|brussels/.test(bt)) return "seasonal-bruschetta-fall-winter";
    return null;
  }
  // individual servings (shooters, cups, singles) must never grab a platter/display/board photo
  const individual = / (shooter|shooters|shot|cup|cups|individual|single|solo) /.test(it);
  let best=null, bestLen=0;
  for(const p of MENU_PHOTOS){
    if(individual && /platter|display|board|collection|tray|wall/i.test(p.name)) continue;
    for(const a of p.aliases){
      const an=menuNorm(a);
      if(an.length>3 && it.indexOf(an)>=0 && an.length>bestLen){ best=p.slug; bestLen=an.length; }
    }
  }
  if(best) return best;
  const st=(sectionTitle||"").toLowerCase();
  const both=(name||"")+" "+st;
  // desserts never fall back to a savory sides photo
  if(DESSERT_NAME.test(name||"") || /dessert|sweet/.test(st)) return null;
  // (generic stand-in fallback removed: items without their own photo show none)
  // wraps are not sandwiches on bread — never give them the generic sandwich photo
  if(/\bwraps?\b/i.test(name||"")) return null;
  // (generic stand-in fallback removed: items without their own photo show none)
  // (generic stand-in fallback removed: items without their own photo show none)
  return null;
}
// the photo actually used for an item — null when the planner X'd it off
function itemPhoto(it, sec){ return it.photoOff ? null : photoForItem(it.name, sec.title, it.desc); }

if (typeof module !== "undefined" && module.exports) {
  module.exports = { MENU_PHOTOS, photoForItem, itemPhoto, menuNorm, MENU_NO_PHOTO, DESSERT_NAME, SALAD_NAME };
}
