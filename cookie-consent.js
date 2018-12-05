function cookieConsent(params) {
    var ccTemplate = '<div id="cc" class="cc-white"><div class="cc-body"><div class="cc-text"><p>{{body}}</p></div><div class="cc-actions"><a id="cc-ok"><b>{{actionOk}}</b></a></div></div></div>';

    var ccOptions = {
        'lang': (params.hasOwnProperty('lang')) ? params.lang : 'en',
        'url': (params.hasOwnProperty('url')) ? params.url : '/de/datenschutz',

        // Must have the same placeholders as the default template: body, actionOk
        'template': (params.hasOwnProperty('template')) ? params.template : ccTemplate
    }

    var ccLang = {
        'en': {
            'body': 'Our website uses cookies to improve your user experience. If you continue browsing, we assume that you consent to our use of cookies. More information can be found in our <a href="{{url}}">Privacy Policy</a>.',
            'actionOk': 'OK'
        },
        'de': {
            'body': 'Diese Webseite nutzt Cookies um die Nutzerfreundlichkeit zu verbessern und die Zugriffe auf unsere Website zu analysieren. In unserer <a href="{{url}}" target="_blank">DatenschutzerklÃ¤rung</a> erhalten Sie detaillierte Informationen und erfahren, wie Sie Ihre Einwilligung jederzeit widerrufen kÃ¶nnen. Sie geben Einwilligung zu unseren Cookies, wenn Sie unsere Webseite weiterhin nutzen.',
            'actionOk': 'OK'
        }
    }

    /**
     * Sets a cookie
     * 
     * @param {string} name
     * @param {string} value
     * @param {int}    days
     */
    function ccSetCookie(name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/';
    }

    /**
     * Gets cookie by name
     * 
     * @param {string} name
     * 
     * @returns {string}
     */
    function ccGetCookie(name) {
        var mName = name + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(mName) == 0) {
                return c.substring(mName.length, c.length);
            }
        }

        return undefined;
    }

    // check whether GDPR cookie is set
    document.addEventListener('DOMContentLoaded', function() {
        var lang = ccLang[ccOptions.lang];
        // fill template with vars
        var ccContent = ccOptions.template
            .replace(
                /{{body}}/,
                lang.body.replace(
                    /{{url}}/,
                    ccOptions.url
                )
            )
            .replace(
                /{{actionOk}}/,
                lang.actionOk
            );

        // append cc to body
        document.body.insertAdjacentHTML('beforeend', ccContent);

        // show #cc if not set
        if (ccGetCookie('GDPR') !== 'true') {
            document.getElementById('cc').style.display = 'block';
        }

        // hide #cc on button click and set cookie
        document.getElementById('cc-ok').addEventListener('click', function() {
            document.getElementById('cc').style.display = 'none';

            // set cookie
            ccSetCookie('GDPR', 'true', 1898);
        });
    });
}
