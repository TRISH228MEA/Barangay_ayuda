require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// =========================
// HOME
// =========================
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Barangay Ayuda server is running!"
  });
});

// =========================
// SUPABASE CONNECTION TEST
// =========================
app.get("/api/health", async (req, res) => {
  try {
    const { error } = await supabase
      .from("applications")
      .select("id")
      .limit(1);

    if (error) {
      return res.status(500).json({
        ok: false,
        message: "Supabase connection failed.",
        error: error.message
      });
    }

    res.json({
      ok: true,
      message: "Backend + Supabase connected!"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Server error."
    });
  }
});

// =========================
// SUBMIT APPLICATION
// =========================
app.post("/api/applications", async (req, res) => {
  try {
    const {
      full_name,
      email,
      age,
      barangay
    } = req.body;

    // Basic validation
    if (!full_name || !email || !age || !barangay) {
      return res.status(400).json({
        ok: false,
        message: "Please complete all required fields."
      });
    }

    const numericAge = Number(age);

    if (!Number.isInteger(numericAge) || numericAge < 1 || numericAge > 120) {
      return res.status(400).json({
        ok: false,
        message: "Please enter a valid age."
      });
    }

    // Save application to Supabase
    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          full_name: full_name.trim(),
          email: email.trim(),
          age: numericAge,
          barangay: barangay.trim()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return res.status(500).json({
        ok: false,
        message: "Unable to submit application.",
        error: error.message
      });
    }

    res.status(201).json({
      ok: true,
      message: "Application submitted successfully.",
      application: data
    });

  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      ok: false,
      message: "Server error."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

