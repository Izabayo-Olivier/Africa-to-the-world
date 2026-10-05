/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

if (menuBtn && mainNav) {

    menuBtn.addEventListener("click", () => {

        mainNav.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (mainNav.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =========================
   DARK MODE
========================= */

const darkModeBtn =
    document.getElementById("darkModeBtn");

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const icon =
            darkModeBtn.querySelector("i");

        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            icon.classList.remove("fa-moon");

            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");

            icon.classList.add("fa-moon");

        }

    });

}


/* =========================
   CONNECTION TEST
========================= */

const connectionBtn =
    document.getElementById("connectionBtn");

const connectionMessage =
    document.getElementById("connectionMessage");

if (connectionBtn && connectionMessage) {

    connectionBtn.addEventListener(
        "click",
        function () {

            connectionMessage.innerHTML =
                '<i class="fas fa-circle-check"></i> ' +
                'Connection successful! HTML, CSS and JavaScript are communicating correctly.';

            connectionMessage.classList.add(
                "connection-success"
            );

        }
    );

}


/* =========================
   TRIP PLANNER
========================= */

const tripPlannerForm =
    document.getElementById("tripPlannerForm");

const tripPlannerResult =
    document.getElementById("tripPlannerResult");

if (tripPlannerForm && tripPlannerResult) {

    tripPlannerForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const formData = new FormData(tripPlannerForm);
        const country = formData.get("country");
        const duration = Number(formData.get("duration"));
        const interest = formData.get("interest");
        const countryIsListed = Array.from(
            tripPlannerForm.elements.country.options
        ).some((option) => option.value === country);

        if (
            typeof country !== "string" ||
            !country ||
            !countryIsListed ||
            !Number.isInteger(duration) ||
            ![3, 5, 7, 10, 14].includes(duration) ||
            typeof interest !== "string" ||
            ![
                "history and heritage",
                "culture and food",
                "nature and wildlife",
                "coast and relaxation"
            ].includes(interest)
        ) {
            tripPlannerForm.reportValidity();
            return;
        }

        tripPlannerResult.replaceChildren();
        tripPlannerResult.hidden = false;

        const outputGrid = document.createElement("div");
        outputGrid.className = "trip-planner-output-grid";

        const itinerary = document.createElement("section");
        itinerary.className = "trip-itinerary";

        const heading = document.createElement("h3");
        heading.textContent = `${duration}-day trip plan for ${country}`;
        itinerary.append(heading);

        const description = document.createElement("p");
        description.textContent =
            `Edit any day's activity to suit you. This ${interest}-focused itinerary is a starting point; travel times and opening hours are not live data.`;
        itinerary.append(description);

        const activities = {
            "history and heritage": [
                "Explore a major historic site or museum and learn about its background.",
                "Visit another heritage site; check opening times and whether a local guide is available.",
                "Leave time for a regional museum, cultural landscape or historic district."
            ],
            "culture and food": [
                "Get oriented in the destination and explore a local market or neighborhood.",
                "Look for a cultural center, craft tradition or locally guided experience.",
                "Try regional food and learn about its cultural and historical context."
            ],
            "nature and wildlife": [
                "Plan a nature-focused day and check park access, local guidance and conservation rules.",
                "Allow time for a second outdoor experience, accounting for travel between locations.",
                "Choose a responsible wildlife or landscape activity and follow local guidance."
            ],
            "coast and relaxation": [
                "Settle in and explore the local coastline or waterfront.",
                "Plan a relaxed coastal day and check local conditions before activities.",
                "Explore a nearby town or cultural site between time to rest."
            ]
        };

        const defaultActivities = [];

        for (let day = 1; day <= duration; day += 1) {
            const activityIndex = (day - 1) % activities[interest].length;
            let activity;

            if (day === 1) {
                activity =
                    `Arrive, get oriented in ${country} and keep the first day flexible.`;
            } else if (day === duration) {
                activity =
                    "Keep time for a final activity, preparations and departure.";
            } else {
                activity = activities[interest][activityIndex];
            }

            defaultActivities.push(activity);
        }

        const dayPlan = document.createElement("ol");
        dayPlan.className = "trip-plan-days";

        const renderDays = () => {
            dayPlan.replaceChildren();

            defaultActivities.forEach((activity, index) => {
                const item = document.createElement("li");
                item.className = "trip-plan-day";

                const dayHeader = document.createElement("div");
                dayHeader.className = "trip-plan-day-header";

                const dayHeading = document.createElement("h4");
                dayHeading.textContent = `Day ${index + 1}`;

                const removeButton = document.createElement("button");
                removeButton.type = "button";
                removeButton.className = "trip-plan-remove-day";
                removeButton.textContent = "Remove day";
                removeButton.disabled = defaultActivities.length === 1;
                removeButton.setAttribute(
                    "aria-label",
                    `Remove day ${index + 1}`
                );
                removeButton.addEventListener("click", () => {
                    defaultActivities.splice(index, 1);
                    renderDays();
                });

                dayHeader.append(dayHeading, removeButton);

                const activityEditor = document.createElement("textarea");
                activityEditor.value = activity;
                activityEditor.setAttribute(
                    "aria-label",
                    `Edit activities for day ${index + 1}`
                );
                activityEditor.addEventListener("input", () => {
                    defaultActivities[index] = activityEditor.value;
                });

                item.append(dayHeader, activityEditor);
                dayPlan.append(item);
            });
        };

        renderDays();
        itinerary.append(dayPlan);

        const addDayButton = document.createElement("button");
        addDayButton.type = "button";
        addDayButton.className = "trip-plan-add-day";
        addDayButton.textContent = "Add a day";
        addDayButton.addEventListener("click", () => {
            if (defaultActivities.length >= 30) {
                return;
            }

            defaultActivities.push(
                activities[interest][
                    (defaultActivities.length - 1) % activities[interest].length
                ]
            );
            renderDays();
        });
        itinerary.append(addDayButton);

        const research = document.createElement("aside");
        research.className = "trip-research-card";

        const researchHeading = document.createElement("h3");
        researchHeading.textContent = `${country}: research and travel checks`;
        research.append(researchHeading);

        const researchIntro = document.createElement("p");
        researchIntro.textContent =
            "Use current official sources for background, security and entry rules. Advisories can depend on your nationality and may change.";
        research.append(researchIntro);

        const researchLinks = document.createElement("div");
        researchLinks.className = "trip-research-links";

        const createResearchLink = (label, url) => {
            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = label;
            researchLinks.append(link);
        };

        const searchUrl = (query) => {
            const url = new URL("https://www.google.com/search");
            url.searchParams.set("q", query);
            return url.href;
        };

        const historyUrl = new URL(
            "https://www.britannica.com/search"
        );
        historyUrl.searchParams.set("query", `${country} history`);

        const heritageUrl = searchUrl(
            `site:whc.unesco.org ${country} heritage`
        );
        const travelGuideUrl = new URL(
            "https://en.wikivoyage.org/w/index.php"
        );
        travelGuideUrl.searchParams.set("search", country);
        const mapUrl = new URL("https://www.google.com/maps/search/");
        mapUrl.searchParams.set("api", "1");
        mapUrl.searchParams.set("query", country);

        createResearchLink("Country history (Britannica)", historyUrl.href);
        createResearchLink("UNESCO heritage search", heritageUrl);
        createResearchLink("Travel guide", travelGuideUrl.href);
        createResearchLink("View destination map", mapUrl.href);
        createResearchLink(
            "Current U.S. travel advisory",
            searchUrl(`site:travel.state.gov ${country} travel advisory`)
        );
        createResearchLink(
            "Current UK travel advice",
            searchUrl(`site:gov.uk/foreign-travel-advice ${country}`)
        );
        createResearchLink(
            "Visa and entry requirements",
            searchUrl(`${country} official immigration visa entry requirements`)
        );
        createResearchLink(
            "IATA travel document guidance",
            "https://www.iatatravelcentre.com/"
        );

        research.append(researchLinks);

        const researchNote = document.createElement("p");
        researchNote.className = "trip-research-note";
        researchNote.textContent =
            "Confirm requirements for your passport nationality and travel dates with the destination's embassy or immigration authority. These links provide sources to check; this planner does not verify live security or visa status.";
        research.append(researchNote);

        outputGrid.append(itinerary, research);
        tripPlannerResult.append(outputGrid);

        tripPlannerResult.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    });

}


/* =========================
   GEMINI TRIP CHAT
========================= */

const tripAssistantForm =
    document.getElementById("tripAssistantForm");

const tripAssistantInput =
    document.getElementById("tripAssistantInput");

const tripAssistantMessages =
    document.getElementById("tripAssistantMessages");

if (
    tripAssistantForm &&
    tripAssistantInput &&
    tripAssistantMessages &&
    tripPlannerForm
) {

    const conversation = [];

    const appendChatMessage = (text, className) => {
        const message = document.createElement("div");
        message.className = `trip-assistant-message ${className}`;

        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        message.append(paragraph);
        tripAssistantMessages.append(message);
        tripAssistantMessages.scrollTop =
            tripAssistantMessages.scrollHeight;

        return message;
    };

    tripAssistantForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const message = tripAssistantInput.value.trim();

        if (!message || message.length > 1500) {
            tripAssistantInput.reportValidity();
            return;
        }

        const countrySelect =
            tripPlannerForm.elements.namedItem("country");
        const durationSelect =
            tripPlannerForm.elements.namedItem("duration");
        const interestSelect =
            tripPlannerForm.elements.namedItem("interest");

        const country = countrySelect.value;
        const durationDays = Number(durationSelect.value);
        const interest = interestSelect.value;
        const countryIsListed = Array.from(countrySelect.options)
            .some((option) => option.value === country);

        if (!countryIsListed || !country) {
            appendChatMessage(
                "Choose a destination in the trip planner first, then ask me about it.",
                "error-message"
            );
            countrySelect.focus();
            return;
        }

        const sendButton =
            tripAssistantForm.querySelector('button[type="submit"]');
        const userMessage = appendChatMessage(
            message,
            "user-message"
        );
        const pendingMessage = appendChatMessage(
            "Thinking…",
            "assistant-message pending-message"
        );

        tripAssistantInput.value = "";
        tripAssistantInput.disabled = true;
        sendButton.disabled = true;

        try {
            const response = await fetch("/api/trip-chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    country,
                    durationDays,
                    interest,
                    history: conversation.slice(-8)
                })
            });

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                if (response.status === 404 || response.status === 405) {
                    throw new Error(
                        "The Gemini chat API isn't running here yet. Deploy this site to Vercel and add your GEMINI_API_KEY environment variable."
                    );
                }

                throw new Error(
                    typeof result?.error === "string"
                        ? result.error
                        : "The travel assistant couldn't respond. Please try again."
                );
            }

            if (
                typeof result?.reply !== "string" ||
                !result.reply.trim()
            ) {
                throw new Error(
                    "The travel assistant returned an empty response. Please try again."
                );
            }

            pendingMessage.remove();
            appendChatMessage(
                result.reply.trim(),
                "assistant-message"
            );
            conversation.push(
                { role: "user", text: message },
                { role: "model", text: result.reply.trim() }
            );
            if (conversation.length > 8) {
                conversation.splice(0, conversation.length - 8);
            }
        } catch (error) {
            pendingMessage.remove();
            userMessage.classList.add("message-not-sent");
            console.error("Trip assistant request failed.", error);
            appendChatMessage(
                error instanceof Error
                    ? error.message
                    : "The travel assistant couldn't respond. Please try again.",
                "error-message"
            );
            tripAssistantInput.value = message;
        } finally {
            tripAssistantInput.disabled = false;
            sendButton.disabled = false;
            tripAssistantInput.focus();
        }
    });

}


/* =========================
   COMPARISON DATA
========================= */

const historicalData = {

    africa: {

        society:
            "Africa contained diverse kingdoms, cities, communities and political systems.",

        trade:
            "African societies participated in regional and international trade networks.",

        slavery:
            "Different forms of slavery existed historically, including systems connected to trans-Saharan, Indian Ocean and Atlantic trade.",

        education:
            "Education existed through oral traditions, religious institutions and centers of learning such as Timbuktu.",

        politics:
            "African political systems ranged from centralized empires and kingdoms to decentralized societies."

    },


    europe: {

        society:
            "Europe developed kingdoms, city-states, empires and later modern nation-states.",

        trade:
            "European merchants participated in Mediterranean, Atlantic and Asian trade networks.",

        slavery:
            "European powers played a major role in the development and expansion of the transatlantic slave trade.",

        education:
            "Universities and religious institutions became important centers of European learning.",

        politics:
            "European political structures included monarchies, republics, empires and eventually nation-states."

    },


    asia: {

        society:
            "Asia contained highly diverse civilizations including China, India, Persia, Japan and Southeast Asian societies.",

        trade:
            "Asian societies participated in extensive Silk Road and Indian Ocean trade networks.",

        slavery:
            "Various systems of slavery and forced labor existed across different Asian societies and historical periods.",

        education:
            "Major centers of scholarship developed in China, India, Persia and other regions.",

        politics:
            "Asian history includes dynasties, empires, kingdoms, sultanates and other political systems."

    },


    americas: {

        society:
            "The Americas were home to numerous Indigenous civilizations and societies before European colonization.",

        trade:
            "Indigenous societies developed extensive regional trade networks.",

        slavery:
            "European colonization introduced and expanded systems of African chattel slavery in the Americas.",

        education:
            "Indigenous societies developed their own systems of knowledge, oral traditions and learning.",

        politics:
            "Political structures included confederacies, city-states, kingdoms and empires."

    }

};


/* =========================
   COMPARISON ENGINE
========================= */

const compareBtn =
    document.getElementById("compareBtn");

const comparisonResult =
    document.getElementById("comparisonResult");

if (compareBtn && comparisonResult) {

    compareBtn.addEventListener(
        "click",
        function () {

            const region1 =
                document.getElementById("region1").value;

            const region2 =
                document.getElementById("region2").value;

            const data1 =
                historicalData[region1];

            const data2 =
                historicalData[region2];

            comparisonResult.innerHTML = `

                <div class="comparison-grid">

                    <div class="feature-card">

                        <h3>
                            <i class="fas fa-globe-africa"></i>
                            ${region1.toUpperCase()}
                        </h3>

                        <p>
                            ${data1.society}
                        </p>

                        <p>
                            <strong>Trade:</strong>
                            ${data1.trade}
                        </p>

                        <p>
                            <strong>Education:</strong>
                            ${data1.education}
                        </p>

                        <p>
                            <strong>Politics:</strong>
                            ${data1.politics}
                        </p>

                    </div>


                    <div class="feature-card">

                        <h3>
                            <i class="fas fa-globe"></i>
                            ${region2.toUpperCase()}
                        </h3>

                        <p>
                            ${data2.society}
                        </p>

                        <p>
                            <strong>Trade:</strong>
                            ${data2.trade}
                        </p>

                        <p>
                            <strong>Education:</strong>
                            ${data2.education}
                        </p>

                        <p>
                            <strong>Politics:</strong>
                            ${data2.politics}
                        </p>

                    </div>

                </div>
            `;

        }
    );

}


/* =========================
   CLOSE MOBILE MENU
========================= */

document.querySelectorAll("#mainNav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            if (mainNav) {
                mainNav.classList.remove("active");
            }

        });

    });