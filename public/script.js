
window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("quote-text")) fetchQuote(); //load quote
  if (document.getElementById("advice-text")) fetchAdvice(); //load advice
  if (document.getElementById("journalEntries")) loadJournalEntries(); //load past journal entries
  if (document.getElementById("moodChart")) renderMoodChart(); //make mood trend chart
});

// fetch quote
function fetchQuote() {
  fetch("/api/quotes")
    .then(res => res.json())
    .then(data => {
      document.getElementById("quote-text").innerText = data.q + " — " + data.a;
    })
    .catch(err => {
      document.getElementById("quote-text").innerText = "Could not load quote.";
      console.error("Quote error:", err);
    });
}

// fetch advice
function fetchAdvice() {
  fetch("/api/advice")
    .then(res => res.json())
    .then(data => {
      document.getElementById("advice-text").innerText = data.advice;
    })
    .catch(err => {
      document.getElementById("advice-text").innerText = "Could not load advice.";
      console.error("Advice error:", err);
    });
}

// load and display jounral entries
function loadJournalEntries() {
  const entriesContainer = document.getElementById("journalEntries");
  if (!entriesContainer) return;

  fetch("/api/entries")
    .then(res => res.json())
    .then(entries => {
      if (!entries.length) {
        entriesContainer.innerText = "No journal entries yet.";
        return;
      }

      // show newest entries first
      entries.reverse().forEach(entry => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${entry.date}</strong> - Mood: ${entry.mood}<br>${entry.text}`;
        entriesContainer.appendChild(div);
      });
    })
    .catch(err => {
      entriesContainer.innerText = "Failed to load entries.";
      console.error("Entry loading error:", err);
    });
}


// make a line chart of moods over time 
function renderMoodChart() {
  const chartCanvas = document.getElementById("moodChart");
  if (!chartCanvas) return;

  fetch("/api/entries")
    .then(res => res.json())
    .then(entries => {
      if (!entries.length) return;

      // convert dates and moods to chart data
      const labels = entries.map(e => e.date);
      const moods = entries.map(e => moodToValue(e.mood));

      new Chart(chartCanvas, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Mood Over Time",
            data: moods,
            fill: false,
            borderColor: "#4a90e2",
            tension: 0.2
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                // convert mood numbers back into text
                callback: value => moodLabel(value)
              },
              beginAtZero: true,
              suggestedMax: 6
            }
          }
        }
      });
    })
    .catch(err => console.error("Chart error:", err));
}

// convert mood text to numbers for charting 
function moodToValue(mood) {
  const moodMap = {
    happy: 6,
    excited: 5,
    tired: 4,
    anxious: 3,
    sad: 2,
    angry: 1
  };
  return moodMap[mood.toLowerCase()] || 0;
}

// convert mood number back to emoji 
function moodLabel(value) {
  const reverseMap = {
    6: "😊 Happy",
    5: "😄 Excited",
    4: "😴 Tired",
    3: "😟 Anxious",
    2: "😢 Sad",
    1: "😠 Angry",
    0: "Unknown"
  };
  return reverseMap[value] || "Unknown";
}



// handles journal entry form submission on home page
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit-entry");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      // get selected mood and journal text 
      const mood = document.getElementById("mood-select").value;
      const text = document.getElementById("journal-entry").value;

      // validate input 
      if (!mood || !text.trim()) {
        alert("Please select a mood and write something.");
        return;
      }

      // send entry to server
      fetch("/api/entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ mood, text })
      })
        .then(res => res.json())
        .then(data => {
          alert("Your entry has been saved!");
          document.getElementById("mood-select").value = ""; // clear form
          document.getElementById("journal-entry").value = "";
        })
        .catch(err => {
          alert("Failed to save entry.");
          console.error("Submission error:", err);
        });
    });
  }
});
