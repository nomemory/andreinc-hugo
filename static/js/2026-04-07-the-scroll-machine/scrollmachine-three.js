const root = document.getElementById("sm");
const stage = document.getElementById("sm-stage");
const view = document.getElementById("sm-view");
const imgEl = document.getElementById("sm-img");
const adEl = document.getElementById("sm-ad");
const adKickerEl = document.getElementById("sm-ad-kicker");
const adTitleEl = document.getElementById("sm-ad-title");
const adSubEl = document.getElementById("sm-ad-sub");
const adCapEl = document.getElementById("sm-ad-cap");
const timerEl = document.getElementById("sm-timer");

if (!root || !stage || !view || !imgEl || !adEl || !timerEl) {
    throw new Error("Scroll machine root not found.");
}

imgEl.decoding = "async";

const reels = [
    {
        image: "/images/2026-04-07-the-scroll-machine/morpheus.jpg",
        user: "dreams_in_480p",
        age: "2m ago",
        caption: "A picture with Morpheus, carefully optimized for vertical devotion.",
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
        caption: "Behold, the supreme lord of media, social media.",
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
        caption: "This is the content you were looking for",
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
        caption: "This is the content you were looking for, generated by AI",
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
];

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
const shareMessages = [
    "Thank you for sharing. Your unpaid growth work has been successfully appreciated.",
    "Your generosity has helped the machine widen its spiritual reach.",
    "Another brave distribution event has been logged for monetization.",
    "Thank you. The algorithm has taken your sacrifice personally.",
    "Your share has nourished several invisible dashboards.",
    "Community expanded. Dignity slightly reduced. Thank you.",
    "This post is traveling now, leaving behind a faint smell of compulsion."
];
const imageCache = new Map();

const state = {
    currentIndex: reels.length - 1,
    lastReelIndex: reels.length - 1,
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
    backgroundPreloadStarted: false
};

function wrapReelIndex(index) {
    if (!reels.length) return 0;
    return (index + reels.length) % reels.length;
}

function adDurationMs() {
    return (3 + Math.floor(Math.random() * 3)) * 1000;
}

function currentAd() {
    return ads[state.adIndex % ads.length];
}

function optimizedImagePath(path) {
    return path
        .replace("/images/2026-04-07-the-scroll-machine/", "/images/2026-04-07-the-scroll-machine/web/")
        .replace(/\.[^.]+$/, ".webp");
}

function cacheImage(url, priority = "auto", fallbackUrl = "") {
    const key = `${url}::${fallbackUrl}`;
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
        probe.onerror = () => {
            if (!fallbackUrl) {
                resolve({ url, loaded: false });
                return;
            }

            const fallback = new Image();
            fallback.decoding = "async";
            if ("fetchPriority" in fallback) {
                fallback.fetchPriority = priority;
            }
            fallback.onload = () => resolve({ url: fallbackUrl, loaded: true });
            fallback.onerror = () => resolve({ url: fallbackUrl, loaded: false });
            fallback.src = fallbackUrl;
        };
        probe.src = url;
    });

    imageCache.set(key, promise);
    return promise;
}

function preloadReelImage(src, priority = "low") {
    return cacheImage(optimizedImagePath(src), priority, src);
}

function warmNearbyImages(index) {
    const seen = new Set();
    const order = [index];

    for (let offset = 1; offset <= 4; offset += 1) {
        order.push(wrapReelIndex(index + offset));
    }
    for (let offset = 1; offset <= 2; offset += 1) {
        order.push(wrapReelIndex(index - offset));
    }

    order.forEach((reelIndex, offset) => {
        if (seen.has(reelIndex)) return;
        seen.add(reelIndex);
        preloadReelImage(reels[reelIndex].image, offset === 0 ? "high" : "low");
    });
}

function warmAllImages(index) {
    if (state.backgroundPreloadStarted) return;
    state.backgroundPreloadStarted = true;

    const queue = [];
    for (let offset = 0; offset < reels.length; offset += 1) {
        queue.push(wrapReelIndex(index + offset));
    }

    let cursor = 0;
    const pump = () => {
        if (cursor >= queue.length) return;
        preloadReelImage(reels[queue[cursor]].image, "low");
        cursor += 1;
        window.setTimeout(pump, 120);
    };

    pump();
}

function swapDisplayedImage(src) {
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
        molochLabelEl.textContent = "Moloch The Brain is extremely dissapointed.";
    } else if (state.dopamine < 0.62) {
        molochEl.classList.add("sm-moloch--bored");
        molochLabelEl.textContent = "Moloch The Brain wants you to scroll.";
    } else {
        molochEl.classList.add("sm-moloch--happy");
        molochLabelEl.textContent = "Moloch The Brain is happy.";
    }
}

function resetLikeUi() {
    if (!likeEl) return;
    if (state.likeTimer) {
        clearTimeout(state.likeTimer);
        state.likeTimer = null;
    }
    likeEl.textContent = "like";
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
    const avatars = ["🙂", "😶", "😵", "🤠", "😼", "🤖", "🐸", "🫠", "👀", "🦝"];
    let score = 0;
    for (const ch of user) {
        score += ch.charCodeAt(0);
    }
    return avatars[score % avatars.length];
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
    if (!commentsListEl) return;
    const comments = reels[index].comments || [];
    commentsListEl.replaceChildren(...comments.map(createCommentNode));
}

function toggleComments() {
    if (!commentsEl || state.currentIsAd) return;
    hideSharePopup();
    const willShow = commentsEl.hidden;
    if (willShow) {
        renderComments(state.currentIndex);
    }
    commentsEl.hidden = !willShow;
}

function toggleSharePopup() {
    if (!sharePopEl || state.currentIsAd) return;
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
    if (!likeEl || state.currentIsAd) return;
    resetLikeUi();
    likeEl.textContent = "♥";
    likeEl.classList.add("is-heart");
    addDopamine(0.12);

    state.likeTimer = window.setTimeout(() => {
        likeEl.textContent = "💩";
        likeEl.classList.remove("is-heart");
        likeEl.classList.add("is-poo");
        state.likeTimer = null;
    }, 900);
}

function showReel(index) {
    const reel = reels[index];
    state.currentIsAd = false;
    state.currentIndex = index;
    state.lastReelIndex = index;

    imgEl.hidden = false;
    adEl.hidden = true;

    userEl.textContent = reel.user;
    ageEl.textContent = reel.age;
    capEl.textContent = reel.caption;

    resetLikeUi();
    hideComments();
    hideSharePopup();

    warmNearbyImages(index);
    warmAllImages(index);
    swapDisplayedImage(reel.image);
}

function showAd() {
    const ad = currentAd();
    state.currentIsAd = true;
    state.imageToken += 1;
    stage.classList.remove("is-loading");

    imgEl.hidden = true;
    adEl.hidden = false;
    adKickerEl.textContent = "LIMITED TIME OFFER";
    adTitleEl.textContent = ad.title;
    adSubEl.textContent = ad.subtitle;
    adCapEl.textContent = ad.caption;

    userEl.textContent = ad.title;
    ageEl.textContent = "ad";
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
    if (state.moving) return;
    state.moving = true;
    const klass = direction > 0 ? "is-moving-up" : "is-moving-down";
    view.classList.remove("is-moving-up", "is-moving-down");
    view.classList.add(klass);
    window.setTimeout(() => {
        view.classList.remove(klass);
        state.moving = false;
    }, 260);
}

function go(direction) {
    if (state.adLocked) return;

    state.scrollsSinceAd += 1;

    if (state.scrollsSinceAd >= 25) {
        state.adIndex = (state.adIndex + 1) % ads.length;
        state.adEndsAt = performance.now() + adDurationMs();
        state.adLocked = true;
        state.currentIsAd = true;
        pulseMove(direction);
        showAd();
        return;
    }

    const baseIndex = state.currentIsAd ? state.lastReelIndex : state.currentIndex;
    const nextIndex = wrapReelIndex(baseIndex + direction);
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
    timerEl.textContent = `Ad ends in ${(remaining / 1000).toFixed(1)}s`;

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
    requestAnimationFrame(tick);
}

function onWheel(event) {
    event.preventDefault();
    if (state.adLocked) return;
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
    if (!event.touches[0] || state.adLocked) return;
    state.touchStartY = event.touches[0].clientY;
    state.touchCurrentY = event.touches[0].clientY;
}

function onTouchMove(event) {
    if (!event.touches[0]) return;
    event.preventDefault();
    state.touchCurrentY = event.touches[0].clientY;
}

function onTouchEnd() {
    if (state.adLocked) return;
    const delta = state.touchCurrentY - state.touchStartY;
    if (Math.abs(delta) < 45) return;
    addDopamine(Math.min(0.32, Math.abs(delta) / 220));
    if (delta < 0) nextItem();
    if (delta > 0) prevItem();
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

showReel(state.currentIndex);
updateDopamineUi();
tick();
