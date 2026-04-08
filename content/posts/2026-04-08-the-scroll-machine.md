+++
date = '2026-04-08'
draft = false
title = 'The scroll machine'
categories = ['thoughts']
tags = ['fun']
usekatex = false
usethreejs = false
customCSS = ["/css/2026-04-07-the-scroll-machine/scrollmachine.css"]
customModuleJS = ["/js/2026-04-07-the-scroll-machine/scrollmachine-three.js"]
+++

<div class="sm-wrap">
    <p class="sm-note">
        Scroll inside the stage with the mouse wheel or with your finger. It is only a machine, but it already understands the gesture. Have fun!
    </p>
    <div class="sm" id="sm">
        <div class="sm-stage" id="sm-stage">
            <div class="sm-view" id="sm-view">
                <img class="sm-img" id="sm-img" alt="A reel in the scroll machine." />
                <div class="sm-ad" id="sm-ad" hidden>
                    <div class="sm-ad-box">
                        <p class="sm-ad-kicker" id="sm-ad-kicker"></p>
                        <h3 class="sm-ad-title" id="sm-ad-title"></h3>
                        <p class="sm-ad-sub" id="sm-ad-sub"></p>
                        <p class="sm-ad-cap" id="sm-ad-cap"></p>
                    </div>
                </div>
            </div>
            <div class="sm-timer" id="sm-timer" hidden></div>
        </div>
        <div class="sm-meta">
            <div class="sm-head">
                <div class="sm-author">
                    <span class="sm-by">Posted by</span>
                    <span class="sm-user" id="sm-user"></span>
                </div>
                <span class="sm-age" id="sm-age"></span>
            </div>
            <p class="sm-cap" id="sm-cap"></p>
            <div class="sm-actions">
                <button type="button" class="sm-like" id="sm-like">like</button>
                <button type="button" class="sm-comment" id="sm-comment">comment</button>
                <button type="button" class="sm-share" id="sm-share">share</button>
            </div>
            <div class="sm-pop" id="sm-comments" hidden>
                <div class="sm-pop-head">
                    <strong>comments</strong>
                    <button type="button" class="sm-close" id="sm-comments-close">close</button>
                </div>
                <div class="sm-comments-list" id="sm-comments-list"></div>
            </div>
            <div class="sm-pop" id="sm-share-pop" hidden>
                <div class="sm-pop-head">
                    <strong>share</strong>
                    <button type="button" class="sm-close" id="sm-share-close">close</button>
                </div>
                <p class="sm-share-msg" id="sm-share-msg">Thank you for sharing. Your unpaid growth work has been successfully appreciated.</p>
            </div>
            <p class="sm-hint">Swipe for the next officially blessed distraction.</p>
            <div class="sm-dopamine">
                <span class="sm-dopamine-label">dopamine levels</span>
                <div class="sm-bar">
                    <div class="dfill" id="dfill"></div>
                </div>
            </div>
            <div class="sm-moloch sm-moloch--hungry" id="sm-moloch" aria-hidden="true">
                <div class="sm-brain">
                    <span class="sm-lobe sm-lobe--1"></span>
                    <span class="sm-lobe sm-lobe--2"></span>
                    <span class="sm-lobe sm-lobe--3"></span>
                    <span class="sm-lobe sm-lobe--4"></span>
                </div>
                <div class="sm-face">
                    <span class="sm-eye sm-eye--left"></span>
                    <span class="sm-eye sm-eye--right"></span>
                    <span class="sm-mouth"></span>
                </div>
                <a class="sm-moloch-label" id="sm-moloch-label" href="/images/2026-04-07-the-scroll-machine/moloch.jpg" target="_blank" rel="noopener noreferrer">Moloch The Brain is unhappy.</a>
            </div>
        </div>
    </div>
</div>

--- 

How to use this marvelous tool:

1. Bookmark this page.
2. Whenever you feel the urge to open your favorite social media app, open this link instead.
3. Scroll for a few moments.
4. Remember you are human.
5. Stop scrolling.
