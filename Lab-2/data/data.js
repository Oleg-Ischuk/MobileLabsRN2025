//? ------------------- ChatScreen.js -------------------
export const tabs = [
  { id: "chats", label: "Open chats" },
  { id: "friends", label: "My friends" },
];

export const chats = [
  {
    id: "chat1",
    name: "Mark Dyson",
    avatar: "https://robohash.org/markdyson?set=set3&bgset=bg1&size=200x200",
    message: "I'm already starting to play",
    time: "14 Jun",
    online: true,
    unread: 1,
  },
  {
    id: "chat2",
    name: "Mark Dyson",
    avatar: "https://robohash.org/markdyson?set=set3&bgset=bg2&size=200x200",
    message: "You: Ok",
    time: "14 Jun",
    online: true,
    unread: 0,
  },
  {
    id: "chat3",
    name: "Mike",
    avatar: "https://robohash.org/player123?set=set1&bgset=bg1&size=200x200",
    message: "You: Ok",
    time: "14 Jun",
    online: true,
    unread: 0,
  },
  {
    id: "chat4",
    name: "Jhon",
    avatar: "https://robohash.org/player123?set=set1&bgset=bg2&size=200x200",
    message: "You: Ok",
    time: "14 Jun",
    online: true,
    unread: 0,
  },
  {
    id: "chat5",
    name: "Player",
    avatar: "https://robohash.org/player?set=set2&bgset=bg1&size=200x200",
    message: "Hello!, I`m ready to play",
    time: "12 Jun",
    online: false,
    unread: 0,
  },
  {
    id: "chat6",
    name: "Player",
    avatar: "https://robohash.org/player?set=set2&bgset=bg1&size=200x200",
    message: "Hello!, How are you?",
    time: "12 Jun",
    online: false,
    unread: 0,
  },
  {
    id: "chat7",
    name: "💎 Σχρρέssø #=_=#",
    avatar: "https://robohash.org/expresso?set=set4&bgset=bg1&size=200x200",
    message: "Ok",
    time: "",
    online: true,
    unread: 0,
  },
  {
    id: "chat8",
    name: "💎 Σχρρέssø #=_=#",
    avatar: "https://robohash.org/expresso?set=set4&bgset=bg2&size=200x200",
    message: "Ok",
    time: "",
    online: true,
    unread: 0,
  },
  {
    id: "chat9",
    name: "Anton",
    avatar: "https://robohash.org/markdyson?set=set3&bgset=bg1&size=200x200",
    message: "How's it going?",
    time: "15 Jun",
    online: true,
    unread: 0,
  },
  {
    id: "chat10",
    name: "John Smith",
    avatar: "https://robohash.org/johnsmith?set=set3&bgset=bg2&size=200x200",
    message: "See you soon!",
    time: "13 Jun",
    online: false,
    unread: 1,
  },
];

//? ------------------- CommunityScreen.js -------------------
export const filters = [
  { id: "all", label: "All" },
  { id: "screenshots", label: "Screenshots" },
  { id: "artwork", label: "Artwork" },
  { id: "workshop", label: "Workshop" },
  { id: "guides", label: "Guides" },
  { id: "news", label: "News" },
  { id: "reviews", label: "Reviews" },
];

export const posts = [
  {
    id: "post1",
    author: "Steam Community",
    badge: "UPDATE",
    time: "today • 3:30 pm",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg",
    title: "Dota 2 introduces new hero and gameplay changes",
    content:
      "Dota 2's latest update brings a fresh hero, 'The Arcane Sentinel,' along with several gameplay tweaks and bug fixes. This update also improves matchmaking and introduces new seasonal skins.",
    likes: 458,
    comments: 29,
    liked: false,
  },
  {
    id: "post2",
    author: "Steam Community",
    badge: "NEWS",
    time: "yesterday • 5:00 pm",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
    title: "Counter-Strike: Global Offensive adds new maps and skins",
    content:
      "The latest CS:GO update brings two new competitive maps, fresh skins, and improvements to the game's anti-cheat system. Fans are also excited about the new weapon balance adjustments.",
    likes: 312,
    comments: 47,
    liked: true,
  },
  {
    id: "post3",
    author: "Steam Community",
    badge: "REVIEW",
    time: "2 days ago • 11:00 am",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/244930/header.jpg",
    title: "Stardew Valley: A farming simulator with heart and soul",
    content:
      "Stardew Valley continues to captivate players with its charming farming simulator mechanics and engaging storylines. Our latest review explores how the game has remained relevant with updates and seasonal events.",
    likes: 221,
    comments: 55,
    liked: true,
  },
  {
    id: "post4",
    author: "Steam Community",
    badge: "DEAL",
    time: "3 days ago • 10:45 am",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg",
    title: "Hunt: Showdown - 50% off during Steam Summer Sale",
    content:
      "Hunt: Showdown is 50% off for a limited time during the Steam Summer Sale! Don't miss out on this thrilling PvPvE experience. Grab it now and enjoy intense bounty hunting action.",
    likes: 98,
    comments: 12,
    liked: false,
  },
  {
    id: "post5",
    author: "Steam Community",
    badge: "LAUNCH",
    time: "4 days ago • 9:00 am",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/774171/header.jpg",
    title: "The Outer Worlds: Spacer’s Choice Edition now available",
    content:
      "The Outer Worlds: Spacer’s Choice Edition is now available on Steam! With enhanced visuals, new content, and improved gameplay features, it's time to return to this unforgettable RPG experience.",
    likes: 389,
    comments: 67,
    liked: true,
  },
];

//? ------------------- StoreScreen.js -------------------
export const categories = [
  { id: "topSellers", label: "Top Sellers" },
  { id: "freeToPlay", label: "Free to play" },
  { id: "earlyAccess", label: "Early Access" },
  { id: "newReleases", label: "New Releases" },
  { id: "specials", label: "Specials" },
  { id: "vr", label: "VR Games" },
];

export const games = [
  {
    id: "gta5",
    title: "Grand Theft Auto V",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
    price: 20,
    discountPrice: 10,
    discount: 50,
    platforms: ["Windows"],
  },
  {
    id: "bf4",
    title: "Battlefield 4",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1238860/header.jpg",
    price: 35,
    platforms: ["Windows"],
  },
  {
    id: "factorio",
    title: "Factorio",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/427520/header.jpg",
    price: 7,
    platforms: ["Windows", "Mac"],
  },
  {
    id: "horizon",
    title: "Horizon Zero Dawn",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg",
    price: 38,
    platforms: ["Windows"],
  },
  {
    id: "elden",
    title: "Elden Ring",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    price: 60,
    platforms: ["Windows"],
  },
  {
    id: "cyberpunk",
    title: "Cyberpunk 2077",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    price: 50,
    discountPrice: 30,
    discount: 40,
    platforms: ["Windows"],
  },
  {
    id: "rdr2",
    title: "Red Dead Redemption 2",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    price: 60,
    discountPrice: 30,
    discount: 50,
    platforms: ["Windows"],
  },
  {
    id: "witcher3",
    title: "The Witcher 3: Wild Hunt",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    price: 40,
    discountPrice: 15,
    discount: 62,
    platforms: ["Windows"],
  },
  {
    id: "doom",
    title: "DOOM Eternal",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg",
    price: 50,
    discountPrice: 25,
    discount: 50,
    platforms: ["Windows"],
  },
  {
    id: "halo",
    title: "Halo: The Master Chief Collection",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/976730/header.jpg",
    price: 40,
    discountPrice: 20,
    discount: 50,
    platforms: ["Windows"],
  },
  {
    id: "valhalla",
    title: "Assassin's Creed Valhalla",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg",
    price: 60,
    discountPrice: 35,
    discount: 42,
    platforms: ["Windows"],
  },
  {
    id: "fifa23",
    title: "FIFA 23",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/header.jpg",
    price: 70,
    discountPrice: 35,
    discount: 50,
    platforms: ["Windows"],
  },
  {
    id: "hades",
    title: "Hades",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
    price: 25,
    discountPrice: 12,
    discount: 52,
    platforms: ["Windows", "Mac"],
  },
  {
    id: "death_stranding",
    title: "Death Stranding",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1190460/header.jpg",
    price: 40,
    discountPrice: 20,
    discount: 50,
    platforms: ["Windows"],
  },
  {
    id: "star_wars",
    title: "Star Wars Jedi: Survivor",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1774580/header.jpg",
    price: 70,
    discountPrice: 45,
    discount: 36,
    platforms: ["Windows"],
  },
  {
    id: "resident8",
    title: "Resident Evil Village",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/header.jpg",
    price: 50,
    discountPrice: 25,
    discount: 50,
    platforms: ["Windows"],
  },
  {
    id: "hollow_knight",
    title: "Hollow Knight",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg",
    price: 15,
    discountPrice: 7,
    discount: 53,
    platforms: ["Windows", "Mac"],
  },
];

export const featuredGames = [
  {
    id: "dbd",
    title: "Dead by Daylight",
    image:
      "https://assetsio.gnwcdn.com/dead-by-daylight-key-art.png?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
    price: 18,
    discountPrice: 5,
    discount: 70,
    platforms: ["Windows"],
    recommended: true,
  },
  {
    id: "witcher3",
    title: "The Witcher 3",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    price: 40,
    discountPrice: 10,
    discount: 75,
    platforms: ["Windows", "Mac"],
    recommended: false,
  },
  {
    id: "hades",
    title: "Hades",
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
    price: 25,
    discountPrice: 15,
    discount: 40,
    platforms: ["Windows", "Mac"],
    recommended: true,
  },
];
