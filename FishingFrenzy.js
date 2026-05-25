/**
 * Fishing Frenzy Panel
 * Full Feature UI
 */

(() => {

    document.getElementById("fishing-frenzy-panel")?.remove();

    let autoFrenzy = false;
    let autoAnswer = false;
    let clientFrenzy = false;

    let frenzyLoop = null;
    let answerLoop = null;

    const distractions = [
        "Crab",
        "Jellyfish",
        "Frog",
        "Pufferfish",
        "Octopus",
        "Narwhal",
        "Megalodon",
        "Blobfish",
        "Baby Shark"
    ];

    // =========================
    // UI
    // =========================
    const ui = document.createElement("div");

    ui.id = "fishing-frenzy-panel";

    ui.style.cssText = `
        position: fixed;
        top: 120px;
        left: 120px;
        width: 300px;
        max-height: 500px;
        overflow-y: auto;
        background: rgba(15,15,15,.96);
        border: 2px solid rgba(255,255,255,.08);
        border-radius: 18px;
        z-index: 999999;
        color: white;
        font-family: Arial,sans-serif;
        backdrop-filter: blur(12px);
        box-shadow: 0 10px 35px rgba(0,0,0,.45);
        user-select: none;
        animation: uiPop .35s ease;
    `;

    // =========================
    // STYLE
    // =========================
    const style = document.createElement("style");

    style.innerHTML = `

        @keyframes uiPop {
            from {
                transform: scale(.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        @keyframes glowPulse {
            0% {
                box-shadow: 0 0 0px rgba(255,70,70,.0);
            }
            50% {
                box-shadow: 0 0 18px rgba(255,70,70,.7);
            }
            100% {
                box-shadow: 0 0 0px rgba(255,70,70,.0);
            }
        }

        #fishing-frenzy-panel::-webkit-scrollbar {
            width: 8px;
        }

        #fishing-frenzy-panel::-webkit-scrollbar-track {
            background: rgba(255,255,255,.05);
            border-radius: 10px;
        }

        #fishing-frenzy-panel::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg,#ff4747,#ff8800);
            border-radius: 10px;
        }

        .ui-btn {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 12px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: .2s;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .ui-btn:hover {
            transform: scale(1.04);
            filter: brightness(1.1);
        }

        .ui-btn:active {
            transform: scale(.95);
        }

        .red-btn {
            background: linear-gradient(135deg,#ff3c3c,#ff7b00);
        }

        .blue-btn {
            background: linear-gradient(135deg,#8e2dff,#4b7cff);
        }

        .green-btn {
            background: linear-gradient(135deg,#00c27a,#00a8ff);
        }

        .toggle {
            width: 42px;
            height: 22px;
            background: #333;
            border-radius: 999px;
            position: relative;
            cursor: pointer;
            transition: .25s;
        }

        .toggle::before {
            content: "";
            position: absolute;
            width: 18px;
            height: 18px;
            background: white;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            transition: .25s;
        }

        .toggle.active {
            background: #ff4d4d;
            animation: glowPulse 1s infinite;
        }

        .toggle.active::before {
            left: 22px;
        }

        .toggle-row {
            margin-top: 12px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            font-size:14px;
        }

        .input-box {
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            border: none;
            outline: none;
            background: rgba(255,255,255,.08);
            color: white;
            margin-bottom: 10px;
            box-sizing: border-box;
            font-size: 14px;
        }

        .input-box::placeholder {
            color: rgba(255,255,255,.5);
        }

        select.input-box {
            cursor: pointer;
        }

    `;

    document.head.appendChild(style);

    // =========================
    // UI HTML
    // =========================
    ui.innerHTML = `

        <div id="drag-header" style="
            padding: 12px;
            background: rgba(255,255,255,.05);
            font-weight: bold;
            cursor: move;
            text-align:center;
            letter-spacing:.5px;
        ">
            Fishing Frenzy Panel
        </div>

        <div style="padding:14px;">

            <button class="ui-btn red-btn" id="frenzyBtn">
                Frenzy
            </button>

            <button class="ui-btn blue-btn" id="unlockBtn">
                Unlock All Blooks
            </button>

            <input
                type="number"
                class="input-box"
                id="weightInput"
                placeholder="Set Weight..."
            >

            <button class="ui-btn green-btn" id="setWeightBtn">
                Set Weight
            </button>

            <input
                type="number"
                class="input-box"
                id="lureInput"
                placeholder="Set Lure (1-5)..."
            >

            <button class="ui-btn green-btn" id="setLureBtn">
                Set Lure
            </button>

            <select
                class="input-box"
                id="distractionSelect"
            >
                <option value="Crab">Crab</option>
                <option value="Jellyfish">Jellyfish</option>
                <option value="Frog">Frog</option>
                <option value="Pufferfish">Pufferfish</option>
                <option value="Octopus">Octopus</option>
                <option value="Narwhal">Narwhal</option>
                <option value="Megalodon">Megalodon</option>
                <option value="Blobfish">Blobfish</option>
                <option value="Baby Shark">Baby Shark</option>
            </select>

            <button class="ui-btn red-btn" id="sendDistractionBtn">
                Send Distraction
            </button>

            <button class="ui-btn blue-btn" id="removeDistractionBtn">
                Remove Distraction
            </button>

            <div class="toggle-row">
                <span>Auto Frenzy</span>
                <div class="toggle" id="frenzyToggle"></div>
            </div>

            <div class="toggle-row">
                <span>Auto Answer</span>
                <div class="toggle" id="answerToggle"></div>
            </div>

            <div class="toggle-row">
                <span>Client Frenzy</span>
                <div class="toggle" id="clientFrenzyToggle"></div>
            </div>

        </div>

    `;

    document.body.appendChild(ui);

    // =========================
    // BUTTON ANIMATION
    // =========================
    const animateButton = (btn) => {

        btn.animate([
            { transform: "scale(1)" },
            { transform: "scale(.92)" },
            { transform: "scale(1)" }
        ], {
            duration: 180
        });

    };

    // =========================
    // FUNCTIONS
    // =========================
    const frenzy = async () => {

        let { stateNode } = Object.values(
            (function react(r = document.querySelector("body>div")) {

                return Object.values(r)[1]?.children?.[0]?._owner.stateNode
                    ? r
                    : react(r.querySelector(":scope>div"));

            })()
        )[1].children[0]._owner;

        stateNode.props.liveGameController.setVal({
            path: `c/${stateNode.props.client.name}`,
            val: {
                b: stateNode.props.client.blook,
                w: stateNode.state.weight,
                f: "Frenzy",
                s: true
            }
        });

    };

    const setWeight = () => {

        let e = Number(
            document.getElementById("weightInput").value
        );

        if (!e || e <= 0) return;

        var t = Object.values(
            document.querySelector("body div[id] > div > div")
        )[1].children[0]._owner.stateNode;

        t.setState({
            weight: e,
            weight2: e
        });

        t.props.liveGameController.setVal({
            path: "c/" + t.props.client.name,
            val: {
                b: t.props.client.blook,
                w: e,
                f: distractions[Math.floor(9 * Math.random())]
            }
        });

    };

    const setLure = () => {

        let lure = Number(
            document.getElementById("lureInput").value
        );

        if (!lure) return;

        Object.values(
            (function react(r = document.querySelector("body>div")) {

                return Object.values(r)[1]?.children?.[0]?._owner.stateNode
                    ? r
                    : react(r.querySelector(":scope>div"));

            })()
        )[1].children[0]._owner.stateNode.setState({

            lure: Math.max(
                Math.min(lure - 1, 4),
                0
            )

        });

    };

    const removeDistraction = () => {

        Object.values(
            (function react(r = document.querySelector("body>div")) {

                return Object.values(r)[1]?.children?.[0]?._owner.stateNode
                    ? r
                    : react(r.querySelector(":scope>div"));

            })()
        )[1].children[0]._owner.stateNode.setState({
            party: ""
        });

    };

    const sendDistraction = () => {

        let { stateNode } = Object.values(
            (function react(r = document.querySelector("body>div")) {

                return Object.values(r)[1]?.children?.[0]?._owner.stateNode
                    ? r
                    : react(r.querySelector(":scope>div"));

            })()
        )[1].children[0]._owner;

        const selectedDistraction =
            document.getElementById("distractionSelect").value;

        stateNode.safe = true;

        stateNode.props.liveGameController.setVal({
            path: `c/${stateNode.props.client.name}`,
            val: {
                b: stateNode.props.client.blook,
                w: stateNode.state.weight,
                f: selectedDistraction,
                s: true
            }
        });

        alert(`Sent ${selectedDistraction} distraction`);

    };

    const toggleClientFrenzy = () => {

        const componentInstance = Object.values(
            document.querySelector("#app > div > div")
        )[1].children[1]._owner.stateNode;

        if (clientFrenzy) {

            clientFrenzy = false;

            componentInstance.setState({
                isFrenzy: false
            });

        } else {

            clientFrenzy = true;

            componentInstance.setState({
                isFrenzy: true
            });

        }

    };

    const startAutoAnswer = () => {

        answerLoop = setInterval(() => {

            try {

                var {
                    state: {
                        question,
                        stage,
                        feedback
                    },
                    props: {
                        client: {
                            question: clientQuestion
                        }
                    }
                } = Object.values(
                    document.querySelector("body div[id] > div > div")
                )[1].children[0]._owner.stateNode;

                let q = question || clientQuestion;

                if (!q) return;

                if (q.qType !== "typing") {

                    (
                        stage === "feedback" || feedback
                            ? document.querySelector('[class*="feedback"]')?.firstChild
                            : [...document.querySelectorAll('[class*="answerContainer"]')]
                                [
                                    q.answers
                                    .map((e, t) =>
                                        q.correctAnswers.includes(e)
                                            ? t
                                            : null
                                    )
                                    .filter(e => e != null)[0]
                                ]
                    )?.click?.();

                } else {

                    Object.values(
                        document.querySelector("[class*='typingAnswerWrapper']")
                    )[1].children._owner.stateNode.sendAnswer(
                        q.answers[0]
                    );

                }

            } catch {}

        }, 50);

    };

    // =========================
    // BUTTON EVENTS
    // =========================
    document.getElementById("frenzyBtn").onclick = async () => {

        animateButton(
            document.getElementById("frenzyBtn")
        );

        await frenzy();

    };

    document.getElementById("setWeightBtn").onclick = () => {

        animateButton(
            document.getElementById("setWeightBtn")
        );

        setWeight();

    };

    document.getElementById("setLureBtn").onclick = () => {

        animateButton(
            document.getElementById("setLureBtn")
        );

        setLure();

    };

    document.getElementById("sendDistractionBtn").onclick = () => {

        animateButton(
            document.getElementById("sendDistractionBtn")
        );

        sendDistraction();

    };

    document.getElementById("removeDistractionBtn").onclick = () => {

        animateButton(
            document.getElementById("removeDistractionBtn")
        );

        removeDistraction();

    };

    // =========================
    // TOGGLES
    // =========================
    const frenzyToggle = document.getElementById("frenzyToggle");
    const answerToggle = document.getElementById("answerToggle");
    const clientFrenzyToggle = document.getElementById("clientFrenzyToggle");

    frenzyToggle.onclick = () => {

        autoFrenzy = !autoFrenzy;

        frenzyToggle.classList.toggle("active");

        if (autoFrenzy) {

            frenzyLoop = setInterval(() => {
                frenzy();
            }, 1000);

        } else {

            clearInterval(frenzyLoop);

        }

    };

    answerToggle.onclick = () => {

        autoAnswer = !autoAnswer;

        answerToggle.classList.toggle("active");

        if (autoAnswer) {

            startAutoAnswer();

        } else {

            clearInterval(answerLoop);

        }

    };

    clientFrenzyToggle.onclick = () => {

        clientFrenzyToggle.classList.toggle("active");

        toggleClientFrenzy();

    };

    // =========================
    // DRAGGING
    // =========================
    const header = document.getElementById("drag-header");

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener("mousedown", (e) => {

        dragging = true;

        offsetX = e.clientX - ui.offsetLeft;
        offsetY = e.clientY - ui.offsetTop;

    });

    document.addEventListener("mousemove", (e) => {

        if (!dragging) return;

        ui.style.left = `${e.clientX - offsetX}px`;
        ui.style.top = `${e.clientY - offsetY}px`;

    });

    document.addEventListener("mouseup", () => {

        dragging = false;

    });

})();
