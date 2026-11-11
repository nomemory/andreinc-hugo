(() => {
    function initialize() {
        const toggle = document.getElementById('ormen-mood-toggle');
        if (!toggle) return;

        // Insert these overrides only while this article's lights are off.
        const theme = document.createElement('style');
        theme.id = 'ormen-mood-theme';
        theme.textContent = `
            html.ormen-blackout {
                color-scheme: dark;
                --background-color: #000;
                --heading-color: #fff;
                --text-color: #fff;
                --link-color: #fff;
                --link-hover: #fff;
                --visited-color: #fff;
                --blockquote-color: #fff;
                --blockquote-bg: #000;
                --border-color: #333;
                --mp-bg: #000;
                --meta-color: #fff;
            }
            html.ormen-blackout,
            html.ormen-blackout body,
            html.ormen-blackout :is(header, main, footer, .mp, blockquote, pre, code) {
                background-color: #000 !important;
                color: #fff !important;
            }
            html.ormen-blackout :is(p, a, span, strong, b, em, small, time, li, button, h2, h3, h4, h5, h6) {
                color: #fff !important;
            }
            html.ormen-blackout main > h1 {
                color: #f00 !important;
            }
            html.ormen-blackout a {
                text-decoration: underline;
            }
        `;

        let dark = false;
        function updateComments() {
            document.querySelector('iframe.giscus-frame')?.contentWindow?.postMessage({
                giscus: { setConfig: { theme: dark ? 'dark' : 'light' } }
            }, 'https://giscus.app');
        }

        toggle.addEventListener('click', () => {
            dark = !dark;
            document.documentElement.classList.toggle('ormen-blackout', dark);
            if (dark) document.head.append(theme);
            else theme.remove();
            toggle.setAttribute('aria-pressed', String(dark));
            toggle.textContent = dark ? 'turn the lights back on' : 'turn out the lights';
            updateComments();
        });

        document.addEventListener('load', event => {
            if (event.target.matches?.('iframe.giscus-frame')) updateComments();
        }, true);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    } else {
        initialize();
    }
})();
