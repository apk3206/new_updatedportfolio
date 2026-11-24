# PATEL ANSH KINJALKRUSHNA
**Phone:** +91 9428456272 | **Email:** [anshpat032@gmail.com](mailto:anshpat032@gmail.com)  
**LinkedIn:** [linkedin.com/in/ansh-patel-322b2028a](https://www.linkedin.com/in/ansh-patel-322b2028a) | **GitHub:** [github.com/apk3206](https://github.com/apk3206)  
**LeetCode:** [leetcode.com/u/anshpatel032](https://leetcode.com/u/anshpatel032/) | **HackerRank:** [hackerrank.com/profile/anshpat032](https://www.hackerrank.com/profile/anshpat032) | **CodeChef:** [codechef.com/users/anshpat032](https://www.codechef.com/users/anshpat032)

---

## **PROFESSIONAL SUMMARY**
Software Developer and IT Engineering student at Dharmsinh Desai University with experience in building web-based applications, digital systems, and deep learning architectures. Skilled in developing efficient, structured, and scalable full-stack solutions, with a track record of deploying production portals for real-time clients (over 6+ months) on AWS Lightsail and researching cutting-edge Test-Time Training (TTT) language model architectures in PyTorch. Strong in problem solving, system analysis, and feature development, with the ability to work independently and collaboratively in a team environment.

---

## **EDUCATION**
* **Bachelor of Engineering in Information Technology**  
  Dharmsinh Desai University (DDU), Nadiad, Gujarat  
  *Graduation:* 2027

---

## **KEY SKILLS**
* **Software Development** | **System Design & Architecture** | **Problem Solving & Debugging**
* **Database Management** | **API Development & Integration** | **Performance Optimization**

---

## **TECHNICAL SKILLS**
* **Languages:** Python, C++, Java, JavaScript (ES6+), SQL, HTML5, CSS3
* **AI & Machine Learning:** PyTorch, CUDA, Test-Time Training (TTT), Transformers, LLM Pretraining/Fine-Tuning, OpenCV, TensorFlow/Keras
* **Web & Frameworks:** React.js (v19), Node.js, Express.js (v5), FastAPI (Python), Streamlit
* **Databases & Tools:** MongoDB, PostgreSQL, SQLite, JSON DB, Git/GitHub, VS Code, Postman
* **Cloud & Systems:** AWS Lightsail, AWS Cloud Foundations, Linux/Bash, JWT Security, Cryptographic Hashing
* **CS Concepts:** Data Structures & Algorithms (DSA), OOP, DBMS, Operating Systems, System Design

---

## **PROJECTS**

### **1. Test-Time Training (TTT) Language Modeling — TTT-Linear & TTT-E2E Architecture**
* **Technologies:** Python, PyTorch, CUDA, `torch_ttt`, Test-Time Training (TTT), Transformers, SwiGLU, AdamW, Streamlit, Kaggle T4 GPU
* **Core Contribution & System Design:**
  * Implemented and benchmarked next-generation recurrent sequence models leveraging **Test-Time Training (TTT)** layers, replacing self-attention with an expressive linear hidden state model updated via online gradient descent during inference.
  * Researched and trained both **TTT-Linear** and **TTT-E2E** PyTorch architectures against a matched **31M parameter causal LM baseline** (512d, 8 layers, 8 heads, SwiGLU 1536, vocab 8k) on the TinyStories-v2 dataset.
  * Formulated an optimized training regimen utilizing **AdamW decoupled weight decay (0.1)**, warmup cosine learning rate scheduling, and multi-metric validation (cross-entropy loss, perplexity ~5.2–5.4, token match ~60%) to prevent representation collapse.
  * Integrated official PyTorch `torch_ttt` modules for local & cloud GPU training (Kaggle T4 / CUDA), and engineered an interactive **Streamlit dashboard** for real-time text generation, loss curve tracking, and attention vs. TTT-Linear hidden state comparison.

### **2. AI Car Damage Claim Detection & Verification System (HackerRank Orchestrate)**
* **Technologies:** Python, OpenCV, OpenAI API (gpt-4o-mini), OpenRouter API, CSV parsing
* **Core Contribution & System Design:**
  * Engineered a multi-modal AI car damage claim validation agent utilizing vision-language models (`gpt-4o-mini`) to detect and evaluate car damage claims (e.g., classifying bumper scratches, body dents, and severity levels) from conversational transcripts, history, and photos.
  * Designed and compared two processing strategies: **Single-Stage Structured Output** (direct visual car claim inspection with strict JSON schemas) and **Two-Stage Reasoning** (textual claim analysis followed by targeted image inspection of damaged car parts).
  * Built a local heuristic fallback algorithm to ensure continuous operations and handle API rate limits (TPM/RPM) or connection issues gracefully during bulk claim processing.
  * Achieved **95.00% accuracy** on claim status, car part identification, and severity classification with 100% schema compliance.

### **3. Mudra Nivesh — Mutual Funds & Wealth Advisory Portal**
* **Technologies:** React.js (v19), Vite, TailwindCSS, Express.js (v5), Node.js, JSON DB, JWT, AWS Lightsail, Lucide Icons
* **Core Contribution & System Design:**
  * Deployed and operated the wealth advisory web portal live on **AWS Lightsail** for **real-time clients over a 6+ month engagement**, linking a custom React frontend with an Express API backend.
  * Programmed a custom **lightweight JWT Authentication & Session verification** module for secure partner access, enforcing auto-expiring 12-hour session keys.
  * Engineered security middleware including **IP-based Rate-Limiting controls** and strict **XSS input sanitization** to secure public lead collection forms against injection and spam.
  * Built an automated transactional tracking engine that dynamically updates client **Assets Under Management (AUM)**, units, and transaction histories when SIP/Lump Sum orders transition to completed states.
  * Designed interactive SIP, Lump Sum, and tax-saver investment calculators protected by visitor lead-capture gates to streamline prospective investor intakes.

### **4. Doctor's Friend — Clinic Practice Management System**
* **Technologies:** React.js, Node.js, Express.js, MongoDB, Twilio API, WhatsApp API
* **Core Contribution & System Design:**
  * Developed a comprehensive clinic portal supporting clinical appointment tracking and patient data management.
  * Built an intelligent **Dual-Mode WhatsApp Broadcast Module** enabling doctors to draft and broadcast clinic announcements.
  * Programmed **Automated Mode** using Twilio's WhatsApp API for background dispatches, and **Manual Queue Mode** utilizing WhatsApp Web URL redirections with pre-filled inputs for zero-cost, zero-setup alerts.
  * Implemented filtering mechanics that allow doctors to segment patient lists by symptom, disease history, or appointment dates for targeted announcements.

### **5. Khedut Bandhu — Agrarian Digital Companion**
* **Technologies:** React.js, Node.js, Express.js, FastAPI (Python), TensorFlow/Keras, Digio Aadhaar KYC, MongoDB
* **Core Contribution & System Design:**
  * Built a multi-role digital ecosystem linking farmers, crop buyers, and government scheme departments.
  * Integrated a deep learning model (CNN trained on PlantVillage dataset) deployed as a Python FastAPI service to evaluate uploaded crop leaf photos for instant disease diagnostics.
  * Created an APMC agricultural marketplace displaying live commodity tickers with simulated price trends to shield farmers from intermediate broker margins.
  * Incorporated Aadhaar KYC check verification flows leveraging the Digio API (with simulation fallbacks) and a secure transactional refund workflow using UPI QR codes.

---

## **CERTIFICATIONS & ACHIEVEMENTS**
* **HackerRank Orchestrate Certificate (June 2026)**
  * Ranked **#950 out of 1,773** developers in the HackerRank Orchestrate AI Hackathon. Built and deployed a production-grade multi-modal AI evaluation agent.
* **AWS Cloud Computing Coursework Certificate**
  * Completed training on Cloud Foundations, covers EC2 virtual servers, RDS database migration, IAM security policies, and Serverless architectures.
* **LeetCode Profile:** Solved over 100+ Data Structures and Algorithms problems (Arrays, HashMaps, Two-Pointers, Binary Search).
