// ==========================================================================
// ANSH PATEL — AI/ML THEMED INTERACTIVE PORTFOLIO ENGINE
// Neural Network Canvas, Particle System, Animated Counters, 3D Tilt
// ==========================================================================

// ==================== 1. NEURAL NETWORK PARTICLE CANVAS ====================
const canvas = document.getElementById('neural-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let particles = [];
let mouse = { x: null, y: null };
const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 150;
const MOUSE_RADIUS = 200;

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        this.baseRadius = this.radius;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction — particles glow near cursor
        if (mouse.x !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS) {
                this.radius = this.baseRadius + (1 - dist / MOUSE_RADIUS) * 3;
                this.opacity = 0.5 + (1 - dist / MOUSE_RADIUS) * 0.5;
            } else {
                this.radius = this.baseRadius;
                this.opacity = Math.max(0.2, this.opacity - 0.01);
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity * 0.15})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECTION_DISTANCE) {
                const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.25;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }

        // Connect to mouse
        if (mouse.x !== null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS) {
                const opacity = (1 - dist / MOUSE_RADIUS) * 0.3;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawConnections();
    requestAnimationFrame(animateCanvas);
}

if (canvas) {
    resizeCanvas();
    initParticles();
    animateCanvas();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
}

// ==================== 2. CUSTOM CURSOR GLOW ====================
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ==================== 3. TERMINAL TYPEWRITER EFFECT ====================
const typewriterPhrases = [
    "python train_ttt.py --model ttt-linear --epochs 50",
    "npm run deploy -- --env production --host aws-lightsail",
    "pytorch.cuda.is_available() → True (T4 GPU)",
    "evaluating VLM agent... accuracy: 95.00%",
    "git push origin main && vercel --prod",
    "model.eval() → validation_ppl: 5.23"
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriter");

function typeEffect() {
    if (!typewriterEl) return;

    const currentPhrase = typewriterPhrases[phraseIdx];

    if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 25 : 55;

    if (!isDeleting && charIdx === currentPhrase.length) {
        speed = 2500;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % typewriterPhrases.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

// ==================== 4. ROTATING TEXT (Hero Line 2) ====================
const rotatingPhrases = [
    "AI Systems",
    "LLM Architectures",
    "Production Platforms",
    "Multimodal Agents",
    "Neural Networks"
];

let rotIdx = 0;
const rotatingEl = document.getElementById("rotating-text");

function rotateText() {
    if (!rotatingEl) return;

    rotatingEl.style.opacity = '0';
    rotatingEl.style.transform = 'translateY(10px)';

    setTimeout(() => {
        rotatingEl.textContent = rotatingPhrases[rotIdx];
        rotatingEl.style.opacity = '1';
        rotatingEl.style.transform = 'translateY(0)';
        rotIdx = (rotIdx + 1) % rotatingPhrases.length;
    }, 300);
}

if (rotatingEl) {
    rotatingEl.style.transition = 'all 0.3s ease';
    rotatingEl.textContent = rotatingPhrases[0];
    setInterval(rotateText, 2500);
}

// ==================== 5. ANIMATED STAT COUNTERS ====================
function animateCounters() {
    const statItems = document.querySelectorAll('.stat-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const target = parseInt(item.getAttribute('data-count'));
                const numberEl = item.querySelector('.stat-number');

                if (numberEl && !numberEl.dataset.animated) {
                    numberEl.dataset.animated = 'true';
                    let current = 0;
                    const step = Math.max(1, Math.ceil(target / 60));
                    const interval = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(interval);
                        }
                        numberEl.textContent = current;
                    }, 25);
                }
            }
        });
    }, { threshold: 0.3 });

    statItems.forEach(item => observer.observe(item));
}

// ==================== 6. ANIMATED SKILL BARS ====================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');

    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const skill = bar.getAttribute('data-skill');

        // Create inner elements
        const label = document.createElement('div');
        label.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;';
        label.innerHTML = `<span style="font-size:0.84rem;font-weight:600;color:var(--text-primary)">${skill}</span>
                          <span style="font-size:0.75rem;font-family:var(--font-mono);color:var(--neon-cyan);font-weight:600">${level}%</span>`;

        const track = document.createElement('div');
        track.style.cssText = 'width:100%;height:6px;background:rgba(124,58,237,0.1);border-radius:9999px;overflow:hidden;';

        const fill = document.createElement('div');
        fill.style.cssText = 'height:100%;border-radius:9999px;background:linear-gradient(90deg,#7c3aed,#06b6d4);box-shadow:0 0 10px rgba(124,58,237,0.4);width:0%;transition:width 1.5s cubic-bezier(0.16,1,0.3,1);';
        fill.dataset.targetWidth = level + '%';

        track.appendChild(fill);
        bar.innerHTML = '';
        bar.appendChild(label);
        bar.appendChild(track);
    });

    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('[data-target-width]');
                fills.forEach(fill => {
                    setTimeout(() => {
                        fill.style.width = fill.dataset.targetWidth;
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-category').forEach(cat => observer.observe(cat));
}

// ==================== 7. SCROLL REVEAL ====================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.section-container, .glass-card, .timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// ==================== 8. CARD HOVER GLOW TRACKING ====================
function initCardGlowTracking() {
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// ==================== 9. PROJECT FILTER TABS ====================
function initProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category.includes(filterValue)) {
                    card.style.display = "flex";
                    card.style.animation = "fadeInUp 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

// ==================== 10. PROJECT MODAL ====================
const projectSpecs = {
    ttt_lm: {
        title: "Test-Time Training (TTT) Language Modeling",
        subtitle: "TTT-Linear & TTT-E2E vs. 31M Transformer Baseline",
        tech: ["Python", "PyTorch", "CUDA", "torch_ttt", "Transformers", "SwiGLU", "AdamW", "Streamlit", "Kaggle T4"],
        overview: "Deep learning research investigating next-gen recurrent sequence modeling via Test-Time Training. Replaces static attention with an expressive linear model whose hidden state is trained during inference via online gradient descent.",
        challenges: [
            "Overcoming quadratic compute bottleneck of Transformers on long contexts without losing expressiveness.",
            "Designing stable training dynamics (AdamW weight decay 0.1, cosine LR scheduling) preventing representation collapse.",
            "Bridging TTT-Linear against official torch_ttt E2E package for reproducible GPU training."
        ],
        specifications: [
            "<strong>TTT-Linear Architecture:</strong> Causal LM with TTT-Linear mixer layers, maintaining expressive linear model as recurrent hidden state updated online via gradient descent.",
            "<strong>31M Baseline Comparison:</strong> Matched 31M parameter Transformer (512d, 8 layers, 8 heads, SwiGLU 1536, vocab 8k) on TinyStories-v2.",
            "<strong>Optimized Training:</strong> AdamW (beta1=0.9, beta2=0.95, weight decay 0.1) with cosine decay floor, achieving val loss ~1.65, PPL ~5.2–5.4.",
            "<strong>E2E Integration:</strong> Adapted official torch_ttt for single-GPU and cloud GPU training.",
            "<strong>Streamlit Inspector:</strong> Real-time text generation, validation metrics, and hidden state visualization."
        ],
        impact: [
            "Demonstrated recurrent linear sequence scaling comparable to attention baselines.",
            "Zero representation collapse via decoupled weight decay and warmup scheduling.",
            "Modular codebase for fast TTT-Linear experimentation."
        ]
    },
    mudranivesh: {
        title: "Mudra Nivesh",
        subtitle: "Mutual Funds & Wealth Advisory Portal (AWS Lightsail)",
        tech: ["React v19", "Vite", "TailwindCSS", "Express v5", "Node.js", "JSON DB", "JWT", "AWS Lightsail"],
        overview: "Modern mutual fund distribution portal deployed on AWS Lightsail for real-time clients over 6+ months.",
        challenges: [
            "Preventing DDoS on public lead intake forms.",
            "Enforcing strict session authentication for financial partners.",
            "Blocking XSS and injection hazards."
        ],
        specifications: [
            "<strong>AWS Lightsail Deployment:</strong> Persistent Node.js Express server serving production files and routing API queries.",
            "<strong>JWT Session Vault:</strong> Lightweight JWT using SHA-256 HMAC signatures for partner access.",
            "<strong>IP Rate Limiting:</strong> Custom middleware tracking IP request counts and blocking flood triggers.",
            "<strong>Auto AUM Updates:</strong> Dynamic recalculation of holdings on SIP/Lump Sum completion.",
            "<strong>Input Sanitization:</strong> PAN validation and XSS escaping utilities."
        ],
        impact: [
            "100% uptime during real-time client operations.",
            "Blocked all malicious inputs and DDoS attempts.",
            "Automated real-time financial tracking for all accounts."
        ]
    },
    orchestrate: {
        title: "AI Car Damage Claim Detection",
        subtitle: "HackerRank Orchestrate — Rank #950 / 1,773 Global",
        tech: ["Python", "OpenCV", "gpt-4o-mini", "OpenRouter", "VLM Agent"],
        overview: "Multimodal AI car damage claim verification agent analyzing transcripts, history logs, and images.",
        challenges: [
            "Enforcing structured JSON from LLM completions under strict schemas.",
            "Mitigating TPM/RPM rate limits during bulk uploads.",
            "High precision car part identification (bumper, windshield, door)."
        ],
        specifications: [
            "<strong>Multi-Modal Pipeline:</strong> Single-Stage (direct JSON-schema payload) and Two-Stage (text extraction + targeted image inspection).",
            "<strong>Heuristic Fallback:</strong> Local algorithm for rate-limit/timeout graceful handling.",
            "<strong>Schema Compliance:</strong> CSV-compliant double-quote formatting preventing line-break corruption.",
            "<strong>Evaluation Suite:</strong> Accuracy validation across claim status, car part, evidence, and risk flags."
        ],
        impact: [
            "Rank <strong>#950 / 1,773</strong> globally.",
            "<strong>95% accuracy</strong> on claim status and severity classification.",
            "Strategy 1: 30% lower latency and reduced API costs."
        ]
    },
    doctorfriend: {
        title: "Doctor's Friend",
        subtitle: "Clinic Practice Management & Broadcast Suite",
        tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Twilio WhatsApp"],
        overview: "Clinic automation for patient records, diagnostics, and announcements.",
        challenges: [
            "Zero-cost broadcast without expensive Twilio subscriptions.",
            "Responsive dashboard for desktop and mobile clinics."
        ],
        specifications: [
            "<strong>Dual-Mode Broadcast:</strong> Automated (Twilio API) and Manual Queue (WhatsApp Web redirections).",
            "<strong>Patient Segmentation:</strong> Query by disease, appointment, or diagnostic keywords.",
            "<strong>Appointment Pipelines:</strong> Booking grids, diagnosis updates, prescription logs."
        ],
        impact: [
            "Reduced notification costs to zero via WhatsApp Web fallback.",
            "Targeted disease alerts to segmented cohorts in under 2 minutes."
        ]
    },
    khedutbandhu: {
        title: "Khedut Bandhu",
        subtitle: "Farmer's Digital Ecosystem & AI Crop Diagnostics",
        tech: ["React.js", "FastAPI", "TensorFlow/Keras", "Digio KYC", "MongoDB"],
        overview: "Gujarat-focused agrarian portal bridging farmers, buyers, subsidies, and AI diagnostics.",
        challenges: [
            "Deploying ML weights on light architectures for mobile conditions.",
            "Direct market access without middlemen exploitation."
        ],
        specifications: [
            "<strong>FastAPI CNN Service:</strong> PlantVillage-trained CNN for instant crop leaf disease diagnosis.",
            "<strong>APMC Dashboard:</strong> Live commodity ticker with simulated market trends.",
            "<strong>Secure Onboarding:</strong> Aadhaar KYC via Digio + UPI QR refund workflows.",
            "<strong>Marketplace:</strong> Agricultural store with admin subsidy validation."
        ],
        impact: [
            "90%+ confidence crop disease diagnosis.",
            "Direct market access eliminating broker commissions."
        ]
    }
};

function openProjectModal(projectId) {
    const modal = document.getElementById("project-modal");
    const bodyContent = document.getElementById("modal-body-content");
    const data = projectSpecs[projectId];

    if (!data) return;

    const techHtml = data.tech.map(t => `<span class="project-tech" style="font-size:0.75rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.15);color:#a78bfa;font-family:var(--font-mono)">${t}</span>`).join("");
    const challengesHtml = data.challenges.map(c => `<li>${c}</li>`).join("");
    const specsHtml = data.specifications.map(s => `<li>${s}</li>`).join("");
    const impactHtml = data.impact.map(i => `<li>${i}</li>`).join("");

    bodyContent.innerHTML = `
        <div class="modal-title"><h2>${data.title}</h2><div class="modal-subtitle">${data.subtitle}</div></div>
        <div class="modal-tech-list" style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1.5rem">${techHtml}</div>
        <div class="modal-section"><h4><i class="fa-solid fa-compass"></i> Overview</h4><p>${data.overview}</p></div>
        <div class="modal-section"><h4><i class="fa-solid fa-triangle-exclamation"></i> Challenges</h4><ul class="modal-bullet-list">${challengesHtml}</ul></div>
        <div class="modal-section"><h4><i class="fa-solid fa-microchip"></i> Specifications</h4><ul class="modal-bullet-list">${specsHtml}</ul></div>
        <div class="modal-section"><h4><i class="fa-solid fa-chart-line"></i> Impact</h4><ul class="modal-bullet-list">${impactHtml}</ul></div>
    `;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeProjectModal() {
    const modal = document.getElementById("project-modal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.addEventListener("click", (e) => {
    const modal = document.getElementById("project-modal");
    if (e.target === modal) closeProjectModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
});

// ==================== 11. CONTACT COPY ====================
function copyContact(type, text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`✓ Copied ${type}: ${text}`);
    }).catch(() => {
        showToast(`${type}: ${text}`);
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
}

// ==================== 12. PDF DOWNLOAD ====================
function triggerResumeDownload() {
    const printBtn = document.getElementById("print-btn");
    const originalText = printBtn ? printBtn.innerHTML : "Resume";

    if (printBtn) {
        printBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Generating...`;
        printBtn.disabled = true;
    }

    const element = document.getElementById('printable-resume');
    if (element) element.style.display = 'block';

    const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Patel_Ansh_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        if (element) element.style.display = 'none';
        if (printBtn) { printBtn.innerHTML = originalText; printBtn.disabled = false; }
        showToast("✓ Resume PDF Downloaded!");
    }).catch(() => {
        if (element) element.style.display = 'none';
        if (printBtn) { printBtn.innerHTML = originalText; printBtn.disabled = false; }
        window.print();
    });
}

document.getElementById("print-btn")?.addEventListener("click", triggerResumeDownload);

// ==================== 13. THEME TOGGLE ====================
const themeToggleBtn = document.getElementById("theme-toggle");
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        const current = document.body.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", next);
        themeToggleBtn.innerHTML = next === "light"
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
        showToast(`🎨 ${next.charAt(0).toUpperCase() + next.slice(1)} theme activated`);
    });
}

// ==================== 14. MOBILE MENU ====================
const mobileToggle = document.getElementById("mobile-menu-toggle");
const mobileDrawer = document.getElementById("mobile-drawer");

if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
        mobileDrawer.classList.toggle("open");
        const isOpen = mobileDrawer.classList.contains("open");
        mobileToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });
}

function closeMobileMenu() {
    if (mobileDrawer) {
        mobileDrawer.classList.remove("open");
        if (mobileToggle) mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
}

// ==================== 15. NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(124, 58, 237, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ==================== 16. SMOOTH SCROLL FOR NAV LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    initProjectFilters();
    animateCounters();
    initSkillBars();
    initScrollReveal();
    initCardGlowTracking();
});
