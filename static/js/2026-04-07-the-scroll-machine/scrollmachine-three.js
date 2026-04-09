const root = document.getElementById("sm");
const stage = document.getElementById("sm-stage");
const view = document.getElementById("sm-view");
const imgEl = document.getElementById("sm-img");
const miniEl = document.getElementById("sm-mini");
const adMiniEl = document.getElementById("sm-ad-mini");
const adEl = document.getElementById("sm-ad");
const adKickerEl = document.getElementById("sm-ad-kicker");
const adTitleEl = document.getElementById("sm-ad-title");
const adSubEl = document.getElementById("sm-ad-sub");
const adCapEl = document.getElementById("sm-ad-cap");
const timerEl = document.getElementById("sm-timer");

if (!root || !stage || !view || !imgEl || !miniEl || !adMiniEl || !adEl || !timerEl) {
    throw new Error("Scroll machine root not found.");
}

imgEl.decoding = "async";
const miniCtx = miniEl.getContext("2d");
const adMiniCtx = adMiniEl.getContext("2d");

const reels = [
    {
        image: "/images/2026-04-07-the-scroll-machine/morpheus.jpg",
        user: "dreams_in_480p",
        age: "2m ago",
        caption: "A picture with Morpheus, carefully optimized for vertical devotion. Morpheus will 'woke' you up.",
        comments: [
            { user: "_tbone203", text: "welcome to the machine. xexxe :))" },
            { user: "mild_panic", text: "This movie is satanic." },
            { user: "sleepy_stef", text: "bro this guy predicted reels before instagram existed" },
            { user: "neon_corn", text: "red pill blue pill both contain ads now." },
            { user: "viki_vex", text: "this man has very calm face for somebody trapped in my feed." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/gnome3.jpg",
        user: "gnome_de_plume",
        age: "7m ago",
        caption: "Swipe to receive the next official rectangle. Don't be shy. Swipe!",
        comments: [
            { user: "blue_mint", text: "Hahaha, i love cinamon bing runnig it since highscool." },
            { user: "last4_blender", text: "Gnome 3 is amazing i don't get the fuss about it. Pure class." },
            { user: "last4_blender", text: "this is dumb" },
            { user: "last4_blender", text: "windoz fanboys this is dumb gnme foreber!!" },
            { user: "mint_tea_2009", text: "bro install xfce and heal from this" },
            { user: "dock_enjoyer", text: "gnome 3 slander in 2026 is still brave i respect it." },
            { user: "pengu_lad", text: "the comments are more unstable then the desktop env." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/casio.jpg",
        user: "casiopeia_child",
        age: "13m ago",
        caption: "Knowledge is scrollable surface. Casio is king. Now you know.",
        comments: [
            { user: "hash_table", text: "Casio sux." },
            { user: "softfocus", text: "Hahahaha rolex fanboys cry in corner xaxa." },
            { user: "softfocus", text: "what model of casio is the person wearing???!!" },
            { user: "wrist_lord", text: "if it doesnt beep every hour i dont want it" },
            { user: "nightbus88", text: "casio is truth. luxury is for weak timing." },
            { user: "chrono_bro", text: "my uncle had this exact watch and zero impulse control." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/tears.jpg",
        user: "tearable_spoon",
        age: "13m ago",
        caption: "A fresh sensation has been prepared, scroll more.",
        comments: [
            { user: "hash_table", text: "The office was peak comedy." },
            { user: "softfocus", text: "this is dumb." },
            { user: "softfocus", text: "i cry" },
            { user: "tin_soup", text: "she is me after 11 pm and 44 reels." },
            { user: "paperlungs", text: "sad but aesthetic so it counts as healing." },
            { user: "h8monday", text: "why is this image judging my life choices?" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/hello.png",
        user: "hello_my_dopamine",
        age: "13m ago",
        caption: "This is managed compulsion. Emotional?",
        comments: [
            { user: "hash_table", text: "The office was peak comedy." },
            { user: "softfocus", text: "this is dumb." },
            { user: "marku", text: "i cry" },
            { user: "pllasticboy", text: "managed compulsion is my favorite genre now." },
            { user: "rotary_joke", text: "the little guy says hello and i obey." },
            { user: "lina_loop", text: "this looks like internet from before lawyers discovered joy." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/work.png",
        user: "bossfight_bedroom",
        age: "13m ago",
        caption: "Stay here long enough and the scroll becomes your pulse!",
        comments: [
            { user: "leopold", text: "omg this sound like me boss hahaha" },
            { user: "canli", text: "capitalism sux" },
            { user: "evil_excel", text: "productivity people see this and clap like seals." },
            { user: "sandra_404", text: "work from home but the home is inside the boss now." },
            { user: "grim_bean_bss", text: "hahahahaha" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/scroll.png",
        user: "scrolliosis_maximus",
        age: "12h ago",
        caption: "Nothing important is happening, but it is happening beautifully.",
        comments: [
            { user: "dop_minea", text: "where do i scroll for more ?" },
            { user: "ser_toninea", text: "scrolling is god" },
            { user: "ser_toninea", text: "i have scrolling withdrawal" },
            { user: "moon_oxide", text: "this pic smells like 3 am and no self respect." },
            { user: "l4cal_prophet", text: "share immediatly." },
            { user: "cable_minded_guy", text: "i looked at this for 9 seconds and forgot rent." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/scroll2.png",
        user: "thumb_and_gloom",
        age: "13h ago",
        caption: "The feed keeps moving so you don't have to think.",
        comments: [
            { user: "dop_minea", text: "this is peak ape brain" },
            { user: "oooopsman", text: "thinking is overrated tbh this feed knows best." },
            { user: "soda_criminal", text: "my thumb moved before my opinion formed." },
            { user: "mara_mira", text: "too true delete this now im upset." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/atlas.jpg",
        user: "atlas_bugged_out",
        age: "13h ago",
        caption: "The machine delivers rotation.",
        comments: [
            { user: "fish_water", text: "yummy!" },
            { user: "water_fish", text: "omg this is what my grandma used to cook" },
            { user: "atlas_shrugged_off", text: "this is sick!!" },
            { user: "soupengine", text: "i click like anyway" },
            { user: "oldplate77", text: "grandma content wins!!!!" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/dugong.jpg",
        user: "wet_sad_manatee",
        age: "12h ago",
        caption: "Nothing ends here.",
        comments: [
            { user: "dop_minea", text: "yummy" },
            { user: "ser_toninea", text: "this monster hit my boat when fishing... crazy animal!" },
            { user: "sea_lawyer", text: "he looks polite actually. maybe your boat started it." },
            { user: "lumpfish9000", text: "this animal has stronger teeth than me!!?!!" },
            { user: "grimtide", text: "nothing ends here...." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/generational.png",
        user: "trauma_laundromat",
        age: "long time ago",
        caption: "That's you in the corner, scrolling, losing your impulse regulation.",
        comments: [
            { user: "faith_maria", text: "ogm omg my parents were monsters" },
            { user: "trauma-lord", text: "mara, trauma is real in this one" },
            { user: "retro_shrink", text: "generational posting event." },
            { user: "uncle_beta", text: "my father also raised me with pure static noises and confusion." },
            { user: "pocket_psalm", text: "this image unlocked 4 memories and all of them smelled rotten." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/darklord.png",
        user: "lord_of_the_reels",
        age: "centuries ago",
        caption: "Behold, the supreme lord of media, social media. Are you feeling emotional?",
        comments: [
            { user: "baptism", text: "the scroll lord changed my life. I wish more people were like him..." },
            { user: "bilord", text: "this is evil" },
            { user: "floclord", text: "panka bakanka telugak" },
            { user: "sacred_feed", text: "i for one welcome our dark engagement emperor." },
            { user: "doom_clergy", text: "finally a leader who understands vertical suffering." },
            { user: "mallwitch", text: "his aura says autoplay!!" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/shortpile.png",
        user: "buffering_my_soul",
        age: "61m ago",
        caption: "Please continue. The emptiness is nearly personalized.",
        comments: [
            { user: "system21", text: "first comment lol hahah" },
            { user: "pixel_gruel", text: "tiny pile of cinema" },
            { user: "meta_lad", text: "smooth..." },
            { user: "voidvoucher", text: "im in this post and i demand another one right now." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/social.png",
        user: "bandage_for_nothing",
        age: "64m ago",
        caption: "...but it can occupy the wound",
        comments: [
            { user: "cancan_kanal_d", text: "woop" },
            { user: "soccer_topology", text: "edge lord take" },
            { user: "slow_ferret", text: "bro this one hurted my soul for zero reason" },
            { user: "marioooo", text: "ma che dici its just a post calm down" },
            { user: "m1runa", text: "prea adevarat si asta ma enerveaza" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/dopamine.png",
        user: "dopameme_reserve",
        age: "2s ago",
        caption: "The platform delivered velocity",
        comments: [
            { user: "chrome_y", text: "women xaxaxa" },
            { user: "bad_bunny", text: "pigs!!" },
            { user: "doom_pops", text: "dopamine machine go brrrrr" },
            { user: "fritz_kola", text: "ich glaube this app is eating my neurons" },
            { user: "silly_kernel", text: "too much colors, i trust it more now" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/aifight.jpg",
        user: "blessed_slop_engine",
        age: "2s ago",
        caption: "This is the content you were looking for, generated with more than AI. Sensitive AI. AI that thinks.",
        comments: [
            { user: "scheduler", text: "xaxaxa i am using freebsd" },
            { user: "bad_fork01", text: "i am using amiga os xa xa xa" },
            { user: "some_scorpion:", text: "wait who is richard stallman fighting?"},
            { user: "feriga2000", text: "frate poza asta are prea multa energie de unchi online" },
            { user: "unix_priest", text: "this image compile bad in my head" },
            { user: "pelican_ru", text: "это искусство брат but also nonsense" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/aifight2.jpg",
        user: "promptgoblin_2000",
        age: "2s ago",
        caption: "This is the content you were looking for, generated by AI. The AI. Now for free.",
        comments: [
            { user: "remember-compiz", text: "xaxaxa my brain at night after scrolling" },
            { user: "bad_pthread", text: "is this a fair fight?" },
            { user: "bloat_untu", text: "wait who is richard stallman fighting his princiuples ?"},
            { user: "relu64", text: "this was generated by ai and by evil together" },
            { user: "minty_mess", text: "nu cred asa ceva frate ce privire are" },
            { user: "taco_driver", text: "muy feo but i cant stop watching" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/cat.jpg",
        user: "catastrophic_meow",
        age: "2s ago",
        caption: "KIKI THE GORILA HAD A PET CAT",
        comments: [
            { user: "remember-feline", text: "meow" },
            { user: "remember-ape", text: "post it on chan" },
            { user: "random", text: "haha this the funnyest thing ive seen online"},
            { user: "cat_politics", text: "this cat know to much and shouldnt be free" },
            { user: "berlin_lad", text: "katze vibe is strong ja ja" },
            { user: "pufuletz", text: "mama ce prostie" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/slotmachine.jpg",
        user: "synergy_slot666",
        age: "2s ago",
        caption: "The platform delivered velocity.",
        comments: [
            { user: "product-owner", text: "development is obsolete" },
            { user: "c-level", text: "ebidtha stonk" },
            { user: "board-member", text: "what is the contigency plan?"},
            { user: "synergy_hawk", text: "very actionable visual, lets pivot into this" },
            { user: "iva_nk", text: "moja firma bi ovo odmah kupila lol" },
            { user: "panicintern", text: "sir the machine is gambling with my future" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/captainplanet.png",
        user: "planetary_doomguy",
        age: "2s ago",
        caption: "Swipe upward to receive the next official rectangle.",
        comments: [
            { user: "gaya", text: "we are planeteers" },
            { user: "acid-rain", text: "you are plants" },
            { user: "linear-transformation", text: "why do FLOP with green energy ?"},
            { user: "greenbean_77", text: "captin planet would hate this app with passion" },
            { user: "niki_nk", text: "аз съм за природата but this is still funny" },
            { user: "bucket_hat", text: "eco doomscrolling is still scrolling bro" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/dracula.png",
        user: "count_scrollula",
        age: "2s ago",
        caption: "A fresh sensation.",
        comments: [
            { user: "vamp-blade", text: "omg! true" },
            { user: "goth-kich", text: "dracula is alucard spelled backwads" },
            { user: "rince-p", text: "so true"},
            { user: "nightmust", text: "frumos vampir :X" },
            { user: "batman_not", text: "he dont bite" },
            { user: "sangria_lover", text: "muy gotico hermano i approve suy darkness" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/subscription.png",
        user: "stream_roll",
        age: "future ago",
        caption: "A nice surprise.",
        comments: [
            { user: "brainrot.plus", text: "bro not another sub. i hate this. content go hard tho." },
            { user: "rent_is_a_theory", text: "they take my money again. but vids are fire sadly." },
            { user: "digi_beggar", text: "subscription is evil. content is peak. im cooked." },
            { user: "vibe_meter9000", text: "this sucks bad but i still wanna watch more." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/oilcat.png",
        user: "liger_in_the_woods",
        age: "future ago",
        caption: "Feline scroll is the best scroll once you learn how to scroll.",
        comments: [
            { user: "golfdad1961", text: "beautiful cat." },
            { user: "susan_from_braila", text: "such nice cat." },
            { user: "uncle_tiberiu", text: "this cat knows things about sunday." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/rssprotects.png",
        user: "oldweb_edge",
        age: "101 minutes ago",
        caption: "Before people were blessed with the wall and the scroll the artitcles were longer.",
        comments: [
            { user: "soft_launch_marx", text: "yall cry too much lol." },
            { user: "hyperpop_uncle", text: "just use the thing bro stop acting 1811." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/pipes.jpg",
        user: "pipe_lord",
        age: "87 minutes ago",
        caption: "Not all heroes burn pipes. Bot, all of them scroll for more.",
        comments: [
            { user: "millenial_fog", text: "history do be repeating again." },
            { user: "lastfm_survivor", text: "seen this before man." },
            { user: "findmeapipe", text: "where u even get pipe like this??" },
            { user: "zoomer_spelunker", text: "need that pipe fr where from." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/store.jpg",
        user: "money_clicks",
        age: "44 minutes ago",
        caption: "It was beautiful, but unscrollable.",
        comments: [
            { user: "portico_thinker", text: "There is an admirable art deco serenity here, geometry disciplined into seduction." },
            { user: "bronze_and_velvet", text: "The verticals are exquisite. One almost forgives commerce when it learns proportion." },
            { user: "late_modernist", text: "Proof that ornament, when restrained by structure, can still feel noble." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/doomscroll.jpg",
        user: "money_clicks",
        age: "20 minutes ago",
        caption: "Do you need an influencer to tell you this?",
        comments: [
            { user: "futurepilled", text: "this is future bro. stop crying like boomer." },
            { user: "clipfarmer", text: "old ppl in comments mad again. this normal now." },
            { user: "scrollmaxxer", text: "why yall complain so much this is how it is." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/tokpile.jpg",
        user: "money_clicks",
        age: "21 minutes ago",
        caption: "Short movies are making your brain short.",
        comments: [
            { user: "zoomz00m", text: "tiktok go hard." },
            { user: "brainju1ce", text: "i love this app fr." },
            { user: "clipgoblin", text: "this so peak bro." },
            { user: "for_you_pilled", text: "nah this ate." },
            { user: "thumbmeal", text: "best app ever idc." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/game.jpg",
        user: "blood_lord11orc",
        age: "21 minutes ago",
        caption: "Let's play. Would you stop scrolling just a little to play my game?",
        comments: [
            { user: "cloudpickle", text: "哈啦星星哇哇的." },
            { user: "nightjar77", text: "什么怪怪哈哈波波." },
            { user: "mint_lagoon", text: "哎呀龙龙喵喵呀." },
            { user: "plasticfork", text: "听不懂但是很神奇." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/game2.jpg",
        user: "blood_lord11orc",
        age: "21 minutes ago",
        caption: "Should you be good at something that you've been trained to enjoy? Look animations!",
        comments: [
            { user: "seriousquester", text: "Does anyone know in what level The Death Scroll drops exactly?" },
            { user: "rotkid77", text: "bro is doing side quest in comments." },
            { user: "lootgoblin420", text: "oldhead asking strategy on doom feed." },
            { user: "xxswipexx", text: "just vibe man who care level." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/link.jpg",
        user: "the_lion_sleeps",
        age: "21 minutes ago",
        caption: "Let's go baby, scrollable careers.",
        comments: [
            { user: "leadership_crafter", text: "This really resonates. We need more conversations around intentional career architecture." },
            { user: "growthmindset_anna", text: "Strong perspective. Adaptability and executive presence remain underrated differentiators." },
            { user: "b2b_visionary", text: "A timely reminder that narrative and positioning shape opportunity at scale." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/link2.jpg",
        user: "the_penguin_bo$$",
        age: "21 minutes ago",
        caption: "Let's go baby, scrollable careers.",
        comments: [
            { user: "futureofwork_dan", text: "Important insight. Sustainable leadership starts with clarity, systems, and long-term trust." },
            { user: "peopleops_elena", text: "This is exactly the kind of professional reflection many organizations still avoid." },
            { user: "strategyfieldnotes", text: "Well said. Credibility compounds when execution and communication stay aligned." }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/mathslop.jpg",
        user: "differential_coconut",
        age: "21 minutes ago",
        caption: "Don't scroll without proving you know advanced math to impress your friends.",
        comments: [
            { user: "countingto9", text: "5" },
            { user: "primeorwhat", text: "7" },
            { user: "maybe_integer", text: "is it 100 ?" },
            { user: "fractionboy", text: "12 maybe" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/celeb.jpg",
        user: "gaga_beyond",
        age: "21 minutes ago",
        caption: "Shocking! Your favourite celebrity is reading a math magazine. Scroll for more.",
        comments: [
            { user: "chromelashes", text: "mother is serving." },
            { user: "sadglitterxx", text: "queen omg i cant breathe." },
            { user: "littlemonsterrr", text: "blue eilish gaga vibes onlyyy." },
            { user: "flashbulbheart", text: "icon behavior fr fr." },
            { user: "actual_reader", text: "Is the magazine a styling prop, or is there a deeper reference behind the visual framing?" }
        ]
    },
    {
        image: "/images/2026-04-07-the-scroll-machine/trump.jpg",
        user: "the_analyst",
        age: "21 minutes ago",
        caption: "It's time to love or to hate. Just feel something so you can scroll for more.",
        comments: [
            { user: "eaglehat77", text: "MAGA forever. cry harder." },
            { user: "bluecitymood", text: "this is why nothing gets fixed in this country." },
            { user: "wall_and_grill", text: "he tells it like it is." },
            { user: "policyplease", text: "all memes no policy again amazing." },
            { user: "truckstoppatriot", text: "red wave baby lets gooo." },
            { user: "coastalcomplaint", text: "another circus for people who think anger is governance." }
        ]
    },
];

const START_REEL_INDEX = 20;

const MINI_ANIMATIONS = {
    face: "face",
    faceHypno: "face-hypno",
    faceNose: "face-nose",
    faceMoney: "face-money",
    faceBlueBlink: "face-blue-blink"
};

const ads = [
    {
        title: "INTERRUPTION",
        subtitle: "Your attention has qualified for premium extraction.",
        caption: "Please enjoy this mandatory ad while the machine lubricates itself."
    },
    {
        title: "AD BREAK",
        subtitle: "A brief pause to improve monetization efficiency.",
        caption: "The feed will resume once the sponsors have had their small ritual."
    },
    {
        title: "CURATED MESSAGE",
        subtitle: "This emotional interval is brought to you by someone else's margins.",
        caption: "You may continue scrolling after the countdown has completed."
    }
];

const UI_TEXT = {
    molochHungry: "Moloch The Brain is extremely dissapointed.",
    molochBored: "Moloch The Brain wants you to scroll.",
    molochHappy: "Moloch The Brain is happy.",
    like: "like",
    likeHeart: "♥",
    likePoo: "💩",
    adKicker: "LIMITED TIME OFFER",
    adAge: "ad",
    adTimerPrefix: "Ad ends in "
};

const MINI_COLORS = {
    ink: "#f4f0e8",
    faint: "rgba(255, 255, 255, 0.2)",
    accentA: "#2d5bff",
    accentB: "#d4315b",
    accentC: "#ffd54a",
    accentD: "#50d890",
    snakeFood: "#ff6b6b",
    faceSkin: "#e6c39f",
    faceLip: "#ff6f91",
    faceEye: "#111111"
};

const AD_SLOT_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const AD_SLOT_MESSAGES = [
    " BUY MORE ", "SCROLLMORE", " HA HA HA ", " DISCOUNT ", "SCROLLOLO", "SKIBIDI", "MORE FEED",
    "STAYONLINE", "SWIPE AGAIN", "DONT STOP",  "GOOD USER"
];
const AD_SLOT_COLUMNS = Math.max(...AD_SLOT_MESSAGES.map((message) => message.length));
const AD_MINI_WIDTH = 420;
const AD_MINI_HEIGHT = 96;

const shareMessages = [
    "Thank you for sharing. Your unpaid growth work has been successfully appreciated.",
    "Your generosity has helped the machine widen its spiritual reach.",
    "Another brave distribution event has been logged for monetization.",
    "Thank you. The algorithm has taken your sacrifice personally.",
    "Your share has nourished several invisible dashboards.",
    "Community expanded. Dignity slightly reduced. Thank you.",
    "This post is traveling now, leaving behind a faint smell of compulsion."
];

const AVATARS = ["🙂", "😶", "😵", "🤠", "😼", "🤖", "🐸", "🫠", "👀", 
                 "🦝", "🙄", "🤢", "💀", "😬", "🤡", "😒", "🫥", "👎", 
                 "😤", "🪰", "🐀", "🪳", "😐", "🧟"];

const userEl = document.getElementById("sm-user");
const ageEl = document.getElementById("sm-age");
const capEl = document.getElementById("sm-cap");
const dfillEl = document.getElementById("dfill");
const molochEl = document.getElementById("sm-moloch");
const molochLabelEl = document.getElementById("sm-moloch-label");
const likeEl = document.getElementById("sm-like");
const commentEl = document.getElementById("sm-comment");
const commentsEl = document.getElementById("sm-comments");
const commentsListEl = document.getElementById("sm-comments-list");
const commentsCloseEl = document.getElementById("sm-comments-close");
const shareEl = document.getElementById("sm-share");
const sharePopEl = document.getElementById("sm-share-pop");
const shareCloseEl = document.getElementById("sm-share-close");
const shareMsgEl = document.getElementById("sm-share-msg");
const imageCache = new Map();
const AD_SCROLL_INTERVAL = 10;
const PRELOAD_AHEAD_COUNT = 5;
const MINI_TYPES = Object.values(MINI_ANIMATIONS);

const state = {
    currentIndex: START_REEL_INDEX,
    currentIsAd: false,
    scrollsSinceAd: 0,
    dopamine: 0.18,
    touchStartY: 0,
    touchCurrentY: 0,
    likeTimer: null,
    adEndsAt: 0,
    adLocked: false,
    adIndex: 0,
    moving: false,
    wheelBuffer: 0,
    lastWheelAt: 0,
    lastShareMessageIndex: -1,
    imageToken: 0,
    cycles: [],
    cycleMiniAnimations: [],
    cycleIndex: 0,
    cyclePosition: 0,
    miniMode: MINI_TYPES[0],
    miniModeStartedAt: 0,
    miniResizedAt: 0,
    adMiniStartedAt: 0,
    adMiniMessage: AD_SLOT_MESSAGES[0]
};

function adDurationMs() {
    return (3 + Math.floor(Math.random() * 3)) * 1000;
}

function currentAd() {
    return ads[state.adIndex % ads.length];
}

function cacheImage(url, priority = "auto") {
    const key = url;
    const cached = imageCache.get(key);
    if (cached) {
        return cached;
    }
    const promise = new Promise((resolve) => {
        const probe = new Image();
        probe.decoding = "async";
        if ("fetchPriority" in probe) {
            probe.fetchPriority = priority;
        }
        probe.onload = () => resolve({ url, loaded: true });
        probe.onerror = () => resolve({ url, loaded: false });
        probe.src = url;
    });
    imageCache.set(key, promise);
    return promise;
}

function preloadReelImage(src, priority = "low") {
    return cacheImage(src, priority);
}

function pickRandomMiniType() {
    return MINI_TYPES[Math.floor(Math.random() * MINI_TYPES.length)];
}

function shuffleIndices(indices) {
    const shuffled = [...indices];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function buildCycleOrder() {
    const rest = [];
    for (let index = 0; index < reels.length; index += 1) {
        if (index !== START_REEL_INDEX) {
            rest.push(index);
        }
    }
    return [START_REEL_INDEX, ...shuffleIndices(rest)];
}

function buildCycleMiniAnimations(length) {
    return Array.from({ length }, () => pickRandomMiniType());
}

function ensureCycle(index) {
    while (state.cycles.length <= index) {
        const cycle = buildCycleOrder();
        state.cycles.push(cycle);
        state.cycleMiniAnimations.push(buildCycleMiniAnimations(cycle.length));
    }
}

function getUpcomingReelIndices(count = PRELOAD_AHEAD_COUNT) {
    const upcoming = [];
    let cycleIndex = state.cycleIndex;
    let cyclePosition = state.cyclePosition + 1;

    while (upcoming.length < count) {
        ensureCycle(cycleIndex);
        const cycle = state.cycles[cycleIndex];

        while (cyclePosition < cycle.length && upcoming.length < count) {
            upcoming.push(cycle[cyclePosition]);
            cyclePosition += 1;
        }

        cycleIndex += 1;
        cyclePosition = 0;

        if (!reels.length) {
            break;
        }
    }

    return upcoming;
}

function preloadUpcomingImages() {
    const seen = new Set();
    const upcoming = getUpcomingReelIndices(PRELOAD_AHEAD_COUNT);

    upcoming.forEach((reelIndex, offset) => {
        if (seen.has(reelIndex)) {
            return;
        }
        seen.add(reelIndex);
        preloadReelImage(reels[reelIndex].image, offset === 0 ? "high" : "low");
    });
}

function currentMiniMode() {
    if (state.currentIsAd) {
        return null;
    }
    ensureCycle(state.cycleIndex);
    const cycleModes = state.cycleMiniAnimations[state.cycleIndex];
    if (!cycleModes) {
        return MINI_TYPES[0];
    }
    return cycleModes[state.cyclePosition] || MINI_TYPES[0];
}

function resizeMiniCanvas(force = false) {
    const now = performance.now();
    if (!force && now - state.miniResizedAt < 120) {
        return;
    }
    const rect = miniEl.getBoundingClientRect();
    if (!rect.width || !rect.height) {
        return;
    }
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width * ratio));
    const height = Math.max(1, Math.round(rect.height * ratio));
    if (force || miniEl.width !== width || miniEl.height !== height) {
        miniEl.width = width;
        miniEl.height = height;
    }
    state.miniResizedAt = now;
}

function applyMiniMode() {
    const nextMode = currentMiniMode();
    if (!nextMode) {
        miniEl.hidden = true;
        return;
    }
    miniEl.hidden = false;
    if (state.miniMode !== nextMode) {
        state.miniMode = nextMode;
        state.miniModeStartedAt = performance.now();
    }
}

function drawMiniInfluencerLabel(ctx, width, height) {
    ctx.fillStyle = MINI_COLORS.ink;
    ctx.font = `${Math.max(7, width * 0.09)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("The Influencer", width * 0.5, height - Math.max(4, height * 0.04));
}

function drawMiniFace(ctx, width, height, time) {
    const cx = width * 0.5;
    const cy = height * 0.5;
    const faceWidth = width * 0.62;
    const faceHeight = height * 0.72;
    const lipWave = Math.sin(time * 0.0036) * height * 0.035;

    ctx.fillStyle = MINI_COLORS.faceSkin;
    ctx.beginPath();
    ctx.ellipse(cx, cy, faceWidth * 0.5, faceHeight * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = MINI_COLORS.faceEye;
    ctx.beginPath();
    ctx.arc(cx - faceWidth * 0.18, cy - faceHeight * 0.12, width * 0.04, 0, Math.PI * 2);
    ctx.arc(cx + faceWidth * 0.18, cy - faceHeight * 0.12, width * 0.04, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = MINI_COLORS.faceEye;
    ctx.lineWidth = Math.max(1.5, width * 0.016);
    ctx.beginPath();
    ctx.moveTo(cx, cy - faceHeight * 0.02);
    ctx.lineTo(cx - width * 0.04, cy + faceHeight * 0.1);
    ctx.lineTo(cx + width * 0.02, cy + faceHeight * 0.13);
    ctx.stroke();

    ctx.strokeStyle = MINI_COLORS.faceLip;
    ctx.lineWidth = Math.max(2, width * 0.026);
    ctx.beginPath();
    ctx.moveTo(cx - faceWidth * 0.18, cy + faceHeight * 0.22);
    for (let i = 0; i <= 20; i += 1) {
        const t = i / 20;
        const x = cx - faceWidth * 0.18 + t * faceWidth * 0.36;
        const y = cy + faceHeight * 0.22 + Math.sin(t * Math.PI) * lipWave;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    drawMiniInfluencerLabel(ctx, width, height);
}

function drawMiniFaceHypno(ctx, width, height, time) {
    const cx = width * 0.5;
    const cy = height * 0.5;
    const faceWidth = width * 0.62;
    const faceHeight = height * 0.72;
    const lipWave = Math.sin(time * 0.0036) * height * 0.035;
    const eyeRadius = width * 0.04;
    const leftEyeX = cx - faceWidth * 0.18;
    const rightEyeX = cx + faceWidth * 0.18;
    const eyeY = cy - faceHeight * 0.12;
    const pulse = (time - state.miniModeStartedAt) * 0.002;
    const eyeHue = (time * 0.045) % 360;

    ctx.fillStyle = MINI_COLORS.faceSkin;
    ctx.beginPath();
    ctx.ellipse(cx, cy, faceWidth * 0.5, faceHeight * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < 3; i += 1) {
        const radius = eyeRadius + (((pulse + i * 0.55) % 1) * width * 0.11);
        const alpha = Math.max(0, 0.35 - i * 0.1 - (((pulse + i * 0.55) % 1) * 0.22));
        ctx.strokeStyle = `hsla(${eyeHue + i * 26}, 88%, 68%, ${alpha})`;
        ctx.lineWidth = Math.max(1, width * 0.012);

        ctx.beginPath();
        ctx.arc(leftEyeX, eyeY, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rightEyeX, eyeY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.fillStyle = `hsl(${eyeHue}, 85%, 62%)`;
    ctx.beginPath();
    ctx.arc(leftEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
    ctx.arc(rightEyeX, eyeY, eyeRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = MINI_COLORS.faceEye;
    ctx.lineWidth = Math.max(1.5, width * 0.016);
    ctx.beginPath();
    ctx.moveTo(cx, cy - faceHeight * 0.02);
    ctx.lineTo(cx - width * 0.04, cy + faceHeight * 0.1);
    ctx.lineTo(cx + width * 0.02, cy + faceHeight * 0.13);
    ctx.stroke();

    ctx.strokeStyle = MINI_COLORS.faceLip;
    ctx.lineWidth = Math.max(2, width * 0.026);
    ctx.beginPath();
    ctx.moveTo(cx - faceWidth * 0.18, cy + faceHeight * 0.22);
    for (let i = 0; i <= 20; i += 1) {
        const t = i / 20;
        const x = cx - faceWidth * 0.18 + t * faceWidth * 0.36;
        const y = cy + faceHeight * 0.22 + Math.sin(t * Math.PI) * lipWave;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    drawMiniInfluencerLabel(ctx, width, height);
}

function drawMiniFaceNose(ctx, width, height, time) {
    const cx = width * 0.5;
    const cy = height * 0.5;
    const faceWidth = width * 0.62;
    const faceHeight = height * 0.72;
    const lipWave = Math.sin(time * 0.0036) * height * 0.035;
    const noseLength = width * (0.08 + (((Math.sin((time - state.miniModeStartedAt) * 0.0028) + 1) * 0.5) * 0.28));
    const noseHeight = height * 0.08;
    const noseX = cx - width * 0.015;
    const noseY = cy + faceHeight * 0.03;

    ctx.fillStyle = MINI_COLORS.faceSkin;
    ctx.beginPath();
    ctx.ellipse(cx, cy, faceWidth * 0.5, faceHeight * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = MINI_COLORS.faceEye;
    ctx.beginPath();
    ctx.arc(cx - faceWidth * 0.18, cy - faceHeight * 0.12, width * 0.04, 0, Math.PI * 2);
    ctx.arc(cx + faceWidth * 0.18, cy - faceHeight * 0.12, width * 0.04, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = MINI_COLORS.faceEye;
    ctx.lineWidth = Math.max(1.5, width * 0.016);
    ctx.fillStyle = MINI_COLORS.faceSkin;
    ctx.beginPath();
    ctx.roundRect(noseX, noseY, noseLength, noseHeight, noseHeight * 0.45);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(noseX + noseLength, noseY + noseHeight * 0.5, noseHeight * 0.26, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = MINI_COLORS.faceLip;
    ctx.lineWidth = Math.max(2, width * 0.026);
    ctx.beginPath();
    ctx.moveTo(cx - faceWidth * 0.18, cy + faceHeight * 0.22);
    for (let i = 0; i <= 20; i += 1) {
        const t = i / 20;
        const x = cx - faceWidth * 0.18 + t * faceWidth * 0.36;
        const y = cy + faceHeight * 0.22 + Math.sin(t * Math.PI) * lipWave;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    drawMiniInfluencerLabel(ctx, width, height);
}

function drawMiniFaceMoney(ctx, width, height, time) {
    const cx = width * 0.5;
    const cy = height * 0.5;
    const faceWidth = width * 0.62;
    const faceHeight = height * 0.72;
    const lipWave = Math.sin(time * 0.0036) * height * 0.035;
    const eyeY = cy - faceHeight * 0.12;

    ctx.fillStyle = MINI_COLORS.faceSkin;
    ctx.beginPath();
    ctx.ellipse(cx, cy, faceWidth * 0.5, faceHeight * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = MINI_COLORS.faceEye;
    ctx.font = `${Math.max(12, width * 0.2)}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("$", cx - faceWidth * 0.18, eyeY);
    ctx.fillText("$", cx + faceWidth * 0.18, eyeY);

    ctx.strokeStyle = MINI_COLORS.faceEye;
    ctx.lineWidth = Math.max(1.5, width * 0.016);
    ctx.beginPath();
    ctx.moveTo(cx, cy - faceHeight * 0.02);
    ctx.lineTo(cx - width * 0.04, cy + faceHeight * 0.1);
    ctx.lineTo(cx + width * 0.02, cy + faceHeight * 0.13);
    ctx.stroke();

    ctx.strokeStyle = MINI_COLORS.faceLip;
    ctx.lineWidth = Math.max(2, width * 0.026);
    ctx.beginPath();
    ctx.moveTo(cx - faceWidth * 0.18, cy + faceHeight * 0.22);
    for (let i = 0; i <= 20; i += 1) {
        const t = i / 20;
        const x = cx - faceWidth * 0.18 + t * faceWidth * 0.36;
        const y = cy + faceHeight * 0.22 + Math.sin(t * Math.PI) * lipWave;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    drawMiniInfluencerLabel(ctx, width, height);
}

function drawMiniFaceBlueBlink(ctx, width, height, time) {
    const cx = width * 0.5;
    const cy = height * 0.5;
    const faceWidth = width * 0.62;
    const faceHeight = height * 0.72;
    const lipWave = Math.sin(time * 0.0036) * height * 0.035;
    const blinkCycle = ((time - state.miniModeStartedAt) * 0.0008) % 1;
    const blinkAmount = blinkCycle > 0.78
        ? Math.max(0.14, Math.abs(Math.cos((blinkCycle - 0.78) * Math.PI * 11)))
        : 1;
    const eyeWidth = width * 0.075;
    const eyeHeight = height * 0.075 * blinkAmount;
    const eyeY = cy - faceHeight * 0.12;
    const leftEyeX = cx - faceWidth * 0.18;
    const rightEyeX = cx + faceWidth * 0.18;

    ctx.fillStyle = MINI_COLORS.faceSkin;
    ctx.beginPath();
    ctx.ellipse(cx, cy, faceWidth * 0.5, faceHeight * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#63a9ff";
    ctx.beginPath();
    ctx.ellipse(leftEyeX, eyeY, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
    ctx.ellipse(rightEyeX, eyeY, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#d8eeff";
    ctx.beginPath();
    ctx.ellipse(leftEyeX - eyeWidth * 0.24, eyeY - eyeHeight * 0.18, eyeWidth * 0.28, Math.max(eyeHeight * 0.26, 1.5), 0, 0, Math.PI * 2);
    ctx.ellipse(rightEyeX - eyeWidth * 0.24, eyeY - eyeHeight * 0.18, eyeWidth * 0.28, Math.max(eyeHeight * 0.26, 1.5), 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = MINI_COLORS.faceEye;
    ctx.lineWidth = Math.max(1.5, width * 0.016);
    ctx.beginPath();
    ctx.moveTo(cx, cy - faceHeight * 0.02);
    ctx.lineTo(cx - width * 0.04, cy + faceHeight * 0.1);
    ctx.lineTo(cx + width * 0.02, cy + faceHeight * 0.13);
    ctx.stroke();

    ctx.strokeStyle = MINI_COLORS.faceLip;
    ctx.lineWidth = Math.max(2, width * 0.026);
    ctx.beginPath();
    ctx.moveTo(cx - faceWidth * 0.18, cy + faceHeight * 0.22);
    for (let i = 0; i <= 20; i += 1) {
        const t = i / 20;
        const x = cx - faceWidth * 0.18 + t * faceWidth * 0.36;
        const y = cy + faceHeight * 0.22 + Math.sin(t * Math.PI) * lipWave;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    drawMiniInfluencerLabel(ctx, width, height);
}

function renderAdMiniCanvas(now) {
    if (adMiniEl.hidden || !adMiniCtx) {
        return;
    }

    const width = adMiniEl.width;
    const height = adMiniEl.height;
    if (!width || !height) {
        return;
    }

    const elapsed = now - state.adMiniStartedAt;
    const settled = state.currentIsAd && !state.adLocked;
    const enterProgress = Math.min(1, elapsed / 520);
    const eased = 1 - Math.pow(1 - enterProgress, 3);
    adMiniEl.style.transform = `translateX(${(-102 + eased * 102).toFixed(2)}%)`;

    adMiniCtx.clearRect(0, 0, width, height);
    adMiniCtx.fillStyle = "rgba(236, 236, 236, 0.94)";
    adMiniCtx.fillRect(0, 0, width, height);
    adMiniCtx.strokeStyle = "rgba(17, 17, 17, 0.85)";
    adMiniCtx.lineWidth = Math.max(2, width * 0.014);
    adMiniCtx.strokeRect(0, 0, width, height);

    const columns = AD_SLOT_COLUMNS;
    const cellGap = Math.max(2, width * 0.004);
    const innerPadX = width * 0.03;
    const innerPadY = height * 0.16;
    const cellWidth = (width - innerPadX * 2 - cellGap * (columns - 1)) / columns;
    const rowHeight = height - innerPadY * 2;
    const top = innerPadY;
    const finalMessage = state.adMiniMessage.padEnd(columns, " ");

    for (let column = 0; column < columns; column += 1) {
        const x = innerPadX + column * (cellWidth + cellGap);
        const spin = elapsed * 0.011 + column * 1.9;
        const currentChar = AD_SLOT_LETTERS[Math.floor(spin) % AD_SLOT_LETTERS.length];
        const nextChar = AD_SLOT_LETTERS[(Math.floor(spin) + 1) % AD_SLOT_LETTERS.length];
        const offset = (spin % 1) * rowHeight;
        const finalChar = finalMessage[column];

        adMiniCtx.fillStyle = "rgba(255, 255, 255, 0.22)";
        adMiniCtx.fillRect(x, top, cellWidth, rowHeight);
        adMiniCtx.strokeStyle = "rgba(17, 17, 17, 0.22)";
        adMiniCtx.lineWidth = Math.max(1, width * 0.004);
        adMiniCtx.strokeRect(x, top, cellWidth, rowHeight);

        if (settled) {
            if (finalChar.trim()) {
                adMiniCtx.fillStyle = MINI_COLORS.faceEye;
                adMiniCtx.font = `${Math.max(12, rowHeight * 0.56)}px sans-serif`;
                adMiniCtx.textAlign = "center";
                adMiniCtx.textBaseline = "middle";
                adMiniCtx.fillText(finalChar, x + cellWidth * 0.5, top + rowHeight * 0.52);
            }
            continue;
        }

        adMiniCtx.fillStyle = MINI_COLORS.faceEye;
        adMiniCtx.font = `${Math.max(12, rowHeight * 0.56)}px sans-serif`;
        adMiniCtx.textAlign = "center";
        adMiniCtx.textBaseline = "middle";
        adMiniCtx.fillText(currentChar, x + cellWidth * 0.5, top + rowHeight * 0.5 - offset);
        adMiniCtx.fillText(nextChar, x + cellWidth * 0.5, top + rowHeight * 1.5 - offset);
    }

}

function renderMiniCanvas(now) {
    if (miniEl.hidden || !miniCtx) {
        return;
    }

    resizeMiniCanvas();
    const width = miniEl.width;
    const height = miniEl.height;
    if (!width || !height) {
        return;
    }

    miniCtx.clearRect(0, 0, width, height);
    miniCtx.fillStyle = "rgba(0, 0, 0, 0.78)";
    miniCtx.fillRect(0, 0, width, height);

    switch (state.miniMode) {
        case MINI_ANIMATIONS.face:
            drawMiniFace(miniCtx, width, height, now);
            break;
        case MINI_ANIMATIONS.faceHypno:
            drawMiniFaceHypno(miniCtx, width, height, now);
            break;
        case MINI_ANIMATIONS.faceNose:
            drawMiniFaceNose(miniCtx, width, height, now);
            break;
        case MINI_ANIMATIONS.faceMoney:
            drawMiniFaceMoney(miniCtx, width, height, now);
            break;
        case MINI_ANIMATIONS.faceBlueBlink:
            drawMiniFaceBlueBlink(miniCtx, width, height, now);
            break;
        default:
            drawMiniFace(miniCtx, width, height, now);
            break;
    }
}

function swapDisplayedImage(src) {
    // Ignore late image loads from older requests when the user scrolls quickly.
    const token = state.imageToken + 1;
    state.imageToken = token;
    stage.classList.add("is-loading");
    return preloadReelImage(src, "high").then((result) => {
        if (token !== state.imageToken) {
            return;
        }
        if (result.loaded && imgEl.src !== result.url) {
            imgEl.src = result.url;
        } else if (!imgEl.getAttribute("src")) {
            imgEl.src = src;
        }
        imgEl.hidden = false;
        stage.classList.remove("is-loading");
    });
}

function addDopamine(amount) {
    state.dopamine = Math.max(0.1, Math.min(1, state.dopamine + amount));
    updateDopamineUi();
}

function updateDopamineUi() {
    if (dfillEl) {
        dfillEl.style.transform = `scaleX(${state.dopamine})`;
    }
    stage.classList.toggle("is-glowing", state.dopamine >= 0.68);
    molochEl.classList.remove("sm-moloch--hungry", "sm-moloch--bored", "sm-moloch--happy");
    if (state.dopamine < 0.34) {
        molochEl.classList.add("sm-moloch--hungry");
        molochLabelEl.textContent = UI_TEXT.molochHungry;
    } else if (state.dopamine < 0.62) {
        molochEl.classList.add("sm-moloch--bored");
        molochLabelEl.textContent = UI_TEXT.molochBored;
    } else {
        molochEl.classList.add("sm-moloch--happy");
        molochLabelEl.textContent = UI_TEXT.molochHappy;
    }
}

function resetLikeUi() {
    if (!likeEl) {
        return;
    }
    if (state.likeTimer) {
        clearTimeout(state.likeTimer);
        state.likeTimer = null;
    }
    likeEl.textContent = UI_TEXT.like;
    likeEl.classList.remove("is-heart", "is-poo");
}

function hideComments() {
    if (commentsEl) {
        commentsEl.hidden = true;
    }
}

function hideSharePopup() {
    if (sharePopEl) {
        sharePopEl.hidden = true;
    }
}

function avatarForUser(user) {
    let score = 0;
    for (const ch of user) {
        score += ch.charCodeAt(0);
    }
    return AVATARS[score % AVATARS.length];
}

function el(tag, className, text = "") {
    const node = document.createElement(tag);
    if (className) {
        node.className = className;
    }
    if (text) {
        node.textContent = text;
    }
    return node;
}

function createCommentNode(comment) {
    const item = el("div", "sm-comment-item");
    const avatar = el("div", "sm-comment-avatar", avatarForUser(comment.user));
    const body = el("div", "sm-comment-body");
    const text = el("p", "sm-comment-text");
    const user = el("span", "sm-comment-user", comment.user);

    text.append(user, document.createTextNode(` ${comment.text}`));
    body.appendChild(text);
    item.append(avatar, body);

    return item;
}

function renderComments(index) {
    if (!commentsListEl) {
        return;
    }
    const comments = reels[index].comments || [];
    commentsListEl.replaceChildren(...comments.map(createCommentNode));
}

function toggleComments() {
    if (!commentsEl || state.currentIsAd) {
        return;
    }
    hideSharePopup();
    if (commentsEl.hidden) {
        renderComments(state.currentIndex);
    }
    commentsEl.hidden = !commentsEl.hidden;
}

function toggleSharePopup() {
    if (!sharePopEl || state.currentIsAd) {
        return;
    }
    hideComments();
    sharePopEl.hidden = false;
    if (shareMsgEl) {
        shareMsgEl.hidden = false;
        let nextIndex = state.lastShareMessageIndex;
        while (shareMessages.length > 1 && nextIndex === state.lastShareMessageIndex) {
            nextIndex = Math.floor(Math.random() * shareMessages.length);
        }
        if (shareMessages.length === 1) {
            nextIndex = 0;
        }
        state.lastShareMessageIndex = nextIndex;
        shareMsgEl.textContent = shareMessages[nextIndex];
    }
}

function triggerLikeSequence() {
    if (!likeEl || state.currentIsAd) {
        return;
    }
    resetLikeUi();
    likeEl.textContent = UI_TEXT.likeHeart;
    likeEl.classList.add("is-heart");
    addDopamine(0.12);
    state.likeTimer = window.setTimeout(() => {
        likeEl.textContent = UI_TEXT.likePoo;
        likeEl.classList.remove("is-heart");
        likeEl.classList.add("is-poo");
        state.likeTimer = null;
    }, 900);
}

function showReel(index) {
    const reel = reels[index];
    state.currentIsAd = false;
    state.currentIndex = index;

    imgEl.hidden = false;
    adEl.hidden = true;
    adMiniEl.hidden = true;
    adMiniEl.style.transform = "translateX(-120%)";
    applyMiniMode();

    userEl.textContent = reel.user;
    ageEl.textContent = reel.age;
    capEl.textContent = reel.caption;

    resetLikeUi();
    hideComments();
    hideSharePopup();

    preloadUpcomingImages();
    swapDisplayedImage(reel.image);
}

function showAd() {
    const ad = currentAd();
    state.currentIsAd = true;
    state.imageToken += 1;
    stage.classList.remove("is-loading");

    imgEl.hidden = true;
    miniEl.hidden = true;
    adEl.hidden = false;
    adMiniEl.hidden = false;
    adMiniEl.style.transform = "translateX(-120%)";
    state.adMiniStartedAt = performance.now();
    state.adMiniMessage = AD_SLOT_MESSAGES[Math.floor(Math.random() * AD_SLOT_MESSAGES.length)];
    adKickerEl.textContent = UI_TEXT.adKicker;
    adTitleEl.textContent = ad.title;
    adSubEl.textContent = ad.subtitle;
    adCapEl.textContent = ad.caption;

    userEl.textContent = ad.title;
    ageEl.textContent = UI_TEXT.adAge;
    capEl.textContent = ad.caption;

    resetLikeUi();
    hideComments();
    hideSharePopup();
}

function renderCurrent() {
    if (state.currentIsAd) {
        showAd();
    } else {
        showReel(state.currentIndex);
    }
}

function pulseMove(direction) {
    if (state.moving) {
        return;
    }
    state.moving = true;
    const klass = direction > 0 ? "is-moving-up" : "is-moving-down";
    view.classList.remove("is-moving-up", "is-moving-down");
    view.classList.add(klass);
    window.setTimeout(() => {
        view.classList.remove(klass);
        state.moving = false;
    }, 260);
}

function stepForwardReel() {
    ensureCycle(state.cycleIndex);
    const cycle = state.cycles[state.cycleIndex];

    if (state.cyclePosition < cycle.length - 1) {
        state.cyclePosition += 1;
    } else {
        state.cycleIndex += 1;
        ensureCycle(state.cycleIndex);
        state.cyclePosition = 0;
    }

    return state.cycles[state.cycleIndex][state.cyclePosition];
}

function stepBackwardReel() {
    if (state.cyclePosition > 0) {
        state.cyclePosition -= 1;
    } else if (state.cycleIndex > 0) {
        state.cycleIndex -= 1;
        ensureCycle(state.cycleIndex);
        state.cyclePosition = state.cycles[state.cycleIndex].length - 1;
    } else {
        return null;
    }

    return state.cycles[state.cycleIndex][state.cyclePosition];
}

function go(direction) {
    if (state.adLocked || state.moving) {
        return;
    }

    if (state.currentIsAd) {
        const nextIndex = direction > 0 ? stepForwardReel() : stepBackwardReel();
        if (nextIndex === null) {
            return;
        }
        pulseMove(direction);
        showReel(nextIndex);
        return;
    }

    state.scrollsSinceAd += 1;

    if (state.scrollsSinceAd >= AD_SCROLL_INTERVAL) {
        state.adIndex = (state.adIndex + 1) % ads.length;
        state.adEndsAt = performance.now() + adDurationMs();
        state.adLocked = true;
        state.currentIsAd = true;
        pulseMove(direction);
        showAd();
        return;
    }

    const nextIndex = direction > 0 ? stepForwardReel() : stepBackwardReel();
    if (nextIndex === null) {
        return;
    }
    pulseMove(direction);
    showReel(nextIndex);
}

function nextItem() {
    go(1);
}

function prevItem() {
    go(-1);
}

function updateTimerUi(now) {
    if (!state.currentIsAd || !state.adLocked) {
        timerEl.hidden = true;
        return;
    }

    const remaining = Math.max(0, state.adEndsAt - now);
    timerEl.hidden = false;
    timerEl.textContent = `${UI_TEXT.adTimerPrefix}${(remaining / 1000).toFixed(1)}s`;

    if (remaining <= 0) {
        state.adLocked = false;
        state.scrollsSinceAd = 0;
        timerEl.hidden = true;
    }
}

function tick() {
    const now = performance.now();
    state.dopamine = Math.max(0.1, state.dopamine - 0.0009);
    updateDopamineUi();
    updateTimerUi(now);
    renderMiniCanvas(now);
    renderAdMiniCanvas(now);
    requestAnimationFrame(tick);
}

function onWheel(event) {
    event.preventDefault();
    if (state.adLocked || state.moving) {
        return;
    }
    addDopamine(Math.min(0.3, Math.abs(event.deltaY) / 700));
    const now = performance.now();
    if (now - state.lastWheelAt > 220) {
        state.wheelBuffer = 0;
    }
    state.lastWheelAt = now;
    state.wheelBuffer += event.deltaY;
    if (state.wheelBuffer > 70) {
        state.wheelBuffer = 0;
        nextItem();
    }
    if (state.wheelBuffer < -70) {
        state.wheelBuffer = 0;
        prevItem();
    }
}

function onTouchStart(event) {
    if (!event.touches[0] || state.adLocked) {
        return;
    }
    state.touchStartY = event.touches[0].clientY;
    state.touchCurrentY = event.touches[0].clientY;
}

function onTouchMove(event) {
    if (!event.touches[0]) {
        return;
    }
    event.preventDefault();
    state.touchCurrentY = event.touches[0].clientY;
}

function onTouchEnd() {
    if (state.adLocked || state.moving) {
        return;
    }
    const delta = state.touchCurrentY - state.touchStartY;
    if (Math.abs(delta) < 45) {
        return;
    }
    addDopamine(Math.min(0.32, Math.abs(delta) / 220));
    if (delta < 0) {
        nextItem();
    }
    if (delta > 0) {
        prevItem();
    }
}

view.addEventListener("wheel", onWheel, { passive: false });
view.addEventListener("touchstart", onTouchStart, { passive: true });
view.addEventListener("touchmove", onTouchMove, { passive: false });
view.addEventListener("touchend", onTouchEnd, { passive: true });

if (likeEl) {
    likeEl.addEventListener("click", triggerLikeSequence);
}
if (commentEl) {
    commentEl.addEventListener("click", toggleComments);
}
if (commentsCloseEl) {
    commentsCloseEl.addEventListener("click", hideComments);
}
if (shareEl) {
    shareEl.addEventListener("click", toggleSharePopup);
}
if (shareCloseEl) {
    shareCloseEl.addEventListener("click", hideSharePopup);
}

state.cycles = [buildCycleOrder()];
state.cycleMiniAnimations = [buildCycleMiniAnimations(state.cycles[0].length)];
state.currentIndex = state.cycles[0][0];
state.miniModeStartedAt = performance.now();
applyMiniMode();
resizeMiniCanvas(true);
adMiniEl.width = AD_MINI_WIDTH;
adMiniEl.height = AD_MINI_HEIGHT;
showReel(state.currentIndex);
updateDopamineUi();
tick();
