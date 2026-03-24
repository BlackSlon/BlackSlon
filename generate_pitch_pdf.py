from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, black, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
import os

# ── Palette ───────────────────────────────────────────────────────────────────
BG       = HexColor("#0A0A0A")
DARK     = HexColor("#181818")
MID      = HexColor("#2A2A2A")
GOLD     = HexColor("#F5C518")
GOLD_DIM = HexColor("#B88C0A")
WHITE    = HexColor("#FFFFFF")
LGRAY    = HexColor("#CCCCCC")
MGRAY    = HexColor("#888888")
GREEN    = HexColor("#22C55E")
RED      = HexColor("#EF4444")
CYAN     = HexColor("#06B6D4")

W, H = 297*mm, 210*mm   # A4 landscape

OUT = "BlackSlon_PitchDeck_2026.pdf"


# ── Helpers ───────────────────────────────────────────────────────────────────

def new_page(c):
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def rect(c, x, y, w, h, fill=None, stroke=None, sw=1):
    if fill:
        c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.rect(x, y, w, h,
           fill=1 if fill else 0,
           stroke=1 if stroke else 0)


def text(c, s, x, y, size=12, color=WHITE, bold=False, align="left"):
    c.setFillColor(color)
    fname = "Helvetica-Bold" if bold else "Helvetica"
    c.setFont(fname, size)
    if align == "center":
        c.drawCentredString(x, y, s)
    elif align == "right":
        c.drawRightString(x, y, s)
    else:
        c.drawString(x, y, s)


def wrap_text(c, s, x, y, max_w, size=11, color=LGRAY, bold=False, line_h=None):
    """Simple word-wrap."""
    if line_h is None:
        line_h = size * 1.45
    fname = "Helvetica-Bold" if bold else "Helvetica"
    c.setFont(fname, size)
    c.setFillColor(color)
    words = s.split()
    line = ""
    cy = y
    for w in words:
        test = (line + " " + w).strip()
        if c.stringWidth(test, fname, size) <= max_w:
            line = test
        else:
            c.drawString(x, cy, line)
            cy -= line_h
            line = w
    if line:
        c.drawString(x, cy, line)
    return cy - line_h   # return Y after last line


def hline(c, x, y, w, color=GOLD, lw=1.5):
    c.setStrokeColor(color)
    c.setLineWidth(lw)
    c.line(x, y, x + w, y)


def slide_header(c, num, title, tag):
    # Number badge
    rect(c, 14*mm, H - 20*mm, 14*mm, 13*mm, fill=GOLD)
    text(c, num, 21*mm, H - 14*mm, size=14, color=black, bold=True, align="center")
    # Tag
    text(c, tag, 32*mm, H - 12*mm, size=9, color=MGRAY)
    # Title
    text(c, title, 32*mm, H - 20.5*mm, size=22, color=GOLD, bold=True)
    # Rule
    hline(c, 14*mm, H - 24*mm, W - 28*mm)


def bullet(c, x, y, txt, size=12, color=LGRAY):
    rect(c, x, y + 2, 3*mm, 3*mm, fill=GOLD)
    wrap_text(c, txt, x + 5*mm, y + 3, W - x - 20*mm, size=size, color=color)


def footer(c, page_n):
    rect(c, 0, 0, W, 8*mm, fill=MID)
    text(c, "blackslon.org  ·  trading@blackslon.org", 14*mm, 2.5*mm,
         size=8, color=MGRAY)
    text(c, f"{page_n} / 11", W - 20*mm, 2.5*mm,
         size=8, color=MGRAY, align="right")


# ══════════════════════════════════════════════════════════════════════════════
# SLIDES
# ══════════════════════════════════════════════════════════════════════════════

def cover(c):
    new_page(c)
    # Gold left bar
    rect(c, 0, 0, 4*mm, H, fill=GOLD)
    # Title
    text(c, "BlackSlon Protocol", 16*mm, H - 50*mm, size=46, color=GOLD, bold=True)
    text(c, "The New Dimension of European Gas & Power Wholesale Markets",
         16*mm, H - 65*mm, size=18, color=WHITE)
    hline(c, 16*mm, H - 72*mm, 230*mm)
    text(c, "Zero Expiry.  Zero Barriers.  100 kWh = 1 Token.",
         16*mm, H - 81*mm, size=14, color=LGRAY)
    # Bottom bar
    rect(c, 0, 0, W, 16*mm, fill=MID)
    text(c, "blackslon.org  ·  trading@blackslon.org",
         16*mm, 5*mm, size=10, color=MGRAY)
    text(c, "Confidential — Seed Round 2026",
         W - 16*mm, 5*mm, size=10, color=MGRAY, align="right")
    c.showPage()


def problem(c):
    new_page(c)
    slide_header(c, "01", "The Architecture of Exclusion", "PROBLEM")

    bullets_data = [
        "European wholesale power & gas market: ~€500B annually, trillions in financial turnover",
        "Controlled by fewer than 250 institutional players",
        "Entry requires €3–5M in capital, 12+ months regulatory onboarding, investment-grade credit ratings",
        "No platform exists giving anyone outside this inner circle access",
    ]
    y = H - 35*mm
    for b in bullets_data:
        bullet(c, 14*mm, y, b, size=12)
        y -= 16*mm

    # Conclusion box
    rect(c, 14*mm, y - 8*mm, W - 28*mm, 14*mm, fill=MID, stroke=GOLD, sw=1.5)
    text(c, "This is not a market inefficiency.  It is the architecture.",
         W / 2, y - 2*mm, size=14, color=GOLD, bold=True, align="center")

    # Stat box
    rect(c, W - 75*mm, H - 80*mm, 60*mm, 40*mm, fill=DARK, stroke=GOLD_DIM, sw=1)
    text(c, "< 250", W - 45*mm, H - 52*mm, size=32, color=GOLD, bold=True, align="center")
    text(c, "institutional players", W - 45*mm, H - 62*mm, size=9, color=MGRAY, align="center")
    text(c, "control European energy", W - 45*mm, H - 69*mm, size=9, color=MGRAY, align="center")

    footer(c, 2)
    c.showPage()


def solution(c):
    new_page(c)
    slide_header(c, "02", "Zero Expiry.  Zero Barriers.  100 kWh = 1 Token.", "SOLUTION")

    rows = [
        ("BlackSlon", "the first decentralised protocol for European wholesale gas & power markets"),
        ("Minimum entry:", "from €744,600 (smallest German yearly power contract) to a few euros"),
        ("Same market,", "accessible to any participant, anywhere, at any time"),
        ("No forced rolls,", "no expiry, no overnight costs, no clearing banks"),
    ]
    y = H - 36*mm
    for label, desc in rows:
        text(c, label, 14*mm, y, size=13, color=GOLD, bold=True)
        text(c, desc, 75*mm, y, size=12, color=LGRAY)
        hline(c, 14*mm, y - 5*mm, W - 28*mm, color=MID, lw=0.5)
        y -= 18*mm

    text(c, "The same market.  For everyone.",
         W / 2, 25*mm, size=20, color=GOLD, bold=True, align="center")

    footer(c, 3)
    c.showPage()


def product(c):
    new_page(c)
    slide_header(c, "03", "The Protocol", "PRODUCT")

    components = [
        ("BSSZ", "Physically-anchored price corridor\nfiltering chaos, preserving trend"),
        ("BSEI", "Manipulation-resistant 72h rolling\nbenchmark index"),
        ("Perpetual Instruments", "No forced rolls, no expiry,\nno overnight costs"),
        ("Smart Liquidation", "10% increments — never\na full forced close"),
        ("eEURO + €BSR", "MiCA-compliant settlement\n& collateral layer"),
    ]

    cols = [(14*mm, H - 36*mm), (82*mm, H - 36*mm), (150*mm, H - 36*mm),
            (14*mm, H - 90*mm), (82*mm, H - 90*mm)]
    bw, bh = 62*mm, 46*mm

    for i, (label, desc) in enumerate(components):
        lx, ty = cols[i]
        rect(c, lx, ty - bh + 4*mm, bw, bh, fill=DARK, stroke=GOLD_DIM, sw=1)
        text(c, label, lx + 3*mm, ty - 4*mm, size=12, color=GOLD, bold=True)
        lines = desc.split("\n")
        dy = ty - 14*mm
        for ln in lines:
            text(c, ln, lx + 3*mm, dy, size=10, color=LGRAY)
            dy -= 12

    # Demo link
    rect(c, 14*mm, 10*mm, W - 28*mm, 12*mm, fill=MID)
    text(c, "Demo live:  blackslon.org/markets",
         W / 2, 14*mm, size=13, color=GOLD, bold=True, align="center")

    footer(c, 4)
    c.showPage()


def market(c):
    new_page(c)
    slide_header(c, "04", "The Opportunity", "MARKET")

    # 3 stat boxes
    boxes = [
        ("~€500B", "physical market annually"),
        ("Trillions", "financial turnover annually"),
        ("0", "direct decentralised competitors"),
    ]
    bx = 14*mm
    for val, lbl in boxes:
        rect(c, bx, H - 80*mm, 82*mm, 42*mm, fill=DARK, stroke=GOLD_DIM, sw=1)
        text(c, val, bx + 41*mm, H - 52*mm, size=28, color=GOLD, bold=True, align="center")
        text(c, lbl, bx + 41*mm, H - 65*mm, size=9, color=MGRAY, align="center")
        bx += 87*mm

    text(c, "Currently excluded from these markets:", 14*mm, H - 96*mm,
         size=12, color=GOLD, bold=True)
    excl = [
        "Independent traders & proprietary shops",
        "Industrial consumers seeking direct hedges",
        "Renewable energy producers",
        "Retail & institutional investors outside the club",
    ]
    y = H - 110*mm
    for item in excl:
        bullet(c, 14*mm, y, item, size=11)
        y -= 14*mm

    text(c, "Adjacent: crypto derivatives $50B+ daily volume  ·  commodity tokenisation (emerging)",
         14*mm, 12*mm, size=9, color=MGRAY)

    footer(c, 5)
    c.showPage()


def bizmodel(c):
    new_page(c)
    slide_header(c, "05", "How BlackSlon Makes Money", "BUSINESS MODEL")

    streams = [
        ("Trading Fees", "0.20% – 1.00% per transaction\n(tiered by €BSR collateral level)"),
        ("Maintenance Fee", "0.1% / month on total vault value"),
        ("PLP Fees", "Proportional share from liquidity\nprovision pool"),
        ("€BSR Appreciation", "Deflationary token — burns\non liquidation events"),
    ]

    positions = [(14*mm, H - 32*mm), (154*mm, H - 32*mm),
                 (14*mm, H - 95*mm), (154*mm, H - 95*mm)]
    bw, bh = 125*mm, 52*mm

    for i, (stream, detail) in enumerate(streams):
        lx, ty = positions[i]
        rect(c, lx, ty - bh + 4*mm, bw, bh, fill=DARK, stroke=GOLD, sw=1.5)
        text(c, stream, lx + 4*mm, ty - 5*mm, size=14, color=GOLD, bold=True)
        lines = detail.split("\n")
        dy = ty - 20*mm
        for ln in lines:
            text(c, ln, lx + 4*mm, dy, size=11, color=LGRAY)
            dy -= 13

    text(c, "Asset-light model — protocol runs algorithmically, 24 / 7 / 365",
         W / 2, 12*mm, size=11, color=MGRAY, align="center")

    footer(c, 6)
    c.showPage()


def traction(c):
    new_page(c)
    slide_header(c, "06", "Where We Are", "TRACTION")

    milestones = [
        (True,  "White Paper v3.0",
                "Complete protocol specification — BSSZ, BSEI, ADR, Health Factor, risk management"),
        (True,  "Working Demo",
                "blackslon.org/markets — live order book, matching engine, risk UI"),
        (True,  "Email Wallet Onboarding",
                "OTP-verified wallet connection — live"),
        (True,  "Alliance DAO Application",
                "Accelerator application submitted"),
        (False, "CASP Licensing",
                "Lithuania / Bulgaria — Q3 2026"),
        (False, "Smart Contract Audit",
                "EVM deployment — H2 2026"),
    ]

    y = H - 34*mm
    for done, title, desc in milestones:
        dot_col = GREEN if done else MGRAY
        rect(c, 14*mm, y, 4*mm, 4*mm, fill=dot_col)
        text(c, title, 22*mm, y + 3, size=12,
             color=GOLD if done else MGRAY, bold=True)
        text(c, desc, 95*mm, y + 3, size=10, color=LGRAY if done else MGRAY)
        hline(c, 14*mm, y - 4*mm, W - 28*mm, color=MID, lw=0.4)
        y -= 16*mm

    text(c, "Founder network: 20+ years of relationships across ICE, EEX, TGE, EPEX",
         14*mm, 12*mm, size=9, color=GOLD_DIM)

    footer(c, 7)
    c.showPage()


def competition(c):
    new_page(c)
    slide_header(c, "07", "Why No One Has Done This", "COMPETITION")

    headers = ["Feature", "BlackSlon", "Traditional Exchanges", "DeFi Protocols"]
    rows_data = [
        ("European energy",       True,  True,  False),
        ("Open access",           True,  False, True),
        ("Physical anchor",       True,  True,  False),
        ("Perpetual instruments", True,  False, "Partial"),
        ("No expiry / rollover",  True,  False, False),
    ]

    col_x   = [14*mm, 85*mm, 160*mm, 230*mm]
    col_w   = [68*mm, 72*mm, 67*mm, 57*mm]
    row_h   = 16*mm
    table_y = H - 32*mm

    # Header row
    for ci, (hdr, cx, cw) in enumerate(zip(headers, col_x, col_w)):
        bg = GOLD if ci == 1 else MID
        fg = black if ci == 1 else MGRAY
        rect(c, cx, table_y - row_h, cw - 1*mm, row_h, fill=bg)
        text(c, hdr, cx + cw/2, table_y - 9*mm, size=10, color=fg, bold=True, align="center")

    # Data rows
    for ri, (label, *vals) in enumerate(rows_data):
        ty = table_y - row_h * (ri + 2)
        row_bg = DARK if ri % 2 == 0 else MID
        for ci, (cx, cw, val) in enumerate(zip(col_x, col_w, [label] + list(vals))):
            bg = GOLD if ci == 1 else row_bg
            rect(c, cx, ty, cw - 1*mm, row_h, fill=bg)
            if ci == 0:
                text(c, val, cx + 3*mm, ty + 5*mm, size=10, color=LGRAY)
            else:
                if val is True:
                    sym, col = "YES", GREEN if ci != 1 else black
                elif val is False:
                    sym, col = "NO", RED if ci != 1 else black
                else:
                    sym, col = "Partial", GOLD_DIM if ci != 1 else black
                text(c, sym, cx + cw/2, ty + 5*mm, size=11,
                     color=col, bold=(ci == 1), align="center")

    text(c,
         "No direct competitor.  Closest: energy derivatives on CME/ICE (institutional only) "
         "and synthetic commodity protocols (no physical anchor).",
         14*mm, 12*mm, size=9, color=MGRAY)

    footer(c, 8)
    c.showPage()


def team(c):
    new_page(c)
    slide_header(c, "08", "The Founder", "TEAM")

    # Name bar
    rect(c, 14*mm, H - 42*mm, W - 28*mm, 14*mm, fill=MID)
    text(c, "Konrad Dynkiewicz  —  Founder",
         16*mm, H - 34*mm, size=18, color=GOLD, bold=True)

    achievements = [
        "20+ years trading Natural Gas, Power, Oil Products, Carbon Emissions across European markets",
        "Trader → Originator → Director → Partner in state-owned, private and global trading houses",
        "One of the largest natural gas suppliers from the European Union to Ukraine",
        "Operated in CEE frontier markets before digital benchmarks or centralised exchanges existed",
        "University of Warsaw  ·  St. Petersburg State University  ·  MGIMO Moscow",
    ]
    y = H - 58*mm
    for item in achievements:
        bullet(c, 14*mm, y, item, size=11)
        y -= 15*mm

    # Seeking box
    rect(c, 14*mm, 10*mm, W - 28*mm, 14*mm, fill=DARK, stroke=GOLD, sw=1.5)
    text(c,
         "Seeking:  Technical co-founder (blockchain / smart contracts)  +  Regulatory counsel",
         W / 2, 15*mm, size=12, color=GOLD, bold=True, align="center")

    footer(c, 9)
    c.showPage()


def roadmap(c):
    new_page(c)
    slide_header(c, "09", "The Path", "ROADMAP")

    phases = [
        ("Phase 1", "2026", "Virtual Protocol",
         ["CASP licensing", "Smart contract audit",
          "Oracle infrastructure", "Live trading", "PLP onboarding"],
         GOLD),
        ("Phase 2", "2027–2028", "Physical Integration",
         ["BS-P/G token physical redemption", "Industrial consumer hedging",
          "Cross-market swaps", "RWA bridge"],
         CYAN),
        ("Phase 3", "2028+", "Benchmark",
         ["BSEI becomes European energy reference",
          "Expansion to 15+ markets"],
         GREEN),
    ]

    px = 14*mm
    pw = 85*mm
    ph = 130*mm

    for phase, year, title, detail, accent in phases:
        # Box
        rect(c, px, H - 28*mm - ph, pw, ph, fill=DARK, stroke=accent, sw=2)
        # Phase header
        rect(c, px, H - 28*mm - 14*mm, pw, 14*mm, fill=accent)
        text(c, phase, px + 4*mm, H - 28*mm - 7*mm, size=11, color=black, bold=True)
        text(c, year, px + pw - 4*mm, H - 28*mm - 7*mm, size=11, color=black, bold=True, align="right")
        # Title
        text(c, title, px + 4*mm, H - 54*mm, size=14, color=accent, bold=True)
        # Details
        dy = H - 68*mm
        for item in detail:
            text(c, f"·  {item}", px + 4*mm, dy, size=10, color=LGRAY)
            dy -= 14
        px += 91*mm

    text(c, "All timelines subject to regulatory approvals and market conditions.",
         14*mm, 12*mm, size=9, color=MGRAY)

    footer(c, 10)
    c.showPage()


def ask(c):
    new_page(c)
    slide_header(c, "10", "Join the Build", "INVESTMENT ASK")

    # Raise box
    rect(c, 14*mm, H - 46*mm, 120*mm, 16*mm, fill=GOLD)
    text(c, "Raising  €2–5M  Seed",
         74*mm, H - 36*mm, size=22, color=black, bold=True, align="center")

    # Allocation
    text(c, "Allocation", 14*mm, H - 60*mm, size=12, color=GOLD, bold=True)
    alloc = [
        ("CASP licensing (Lithuania / Bulgaria)", "25%"),
        ("Smart contract development & audit", "30%"),
        ("Oracle infrastructure", "15%"),
        ("Regulatory counsel", "15%"),
        ("Operations & runway (12 months)", "15%"),
    ]
    y = H - 74*mm
    for item, pct in alloc:
        text(c, item, 16*mm, y, size=10, color=LGRAY)
        text(c, pct, 135*mm, y, size=11, color=GOLD, bold=True, align="right")
        y -= 13*mm

    # Right column — Looking for
    rect(c, 150*mm, H - 170*mm, 133*mm, 142*mm, fill=DARK, stroke=GOLD_DIM, sw=1)
    text(c, "Looking for:", 153*mm, H - 38*mm, size=12, color=GOLD, bold=True)

    looking = [
        ("Seed capital", "VC / angel"),
        ("Technical co-founder", "blockchain / smart contracts partner"),
        ("First PLP", "€500K minimum · Genesis €BSR allocation"),
    ]
    ly = H - 56*mm
    for title, sub in looking:
        rect(c, 152*mm, ly - 12*mm, 128*mm, 26*mm, fill=MID)
        text(c, title, 155*mm, ly, size=12, color=WHITE, bold=True)
        text(c, sub, 155*mm, ly - 12*mm, size=10, color=MGRAY)
        ly -= 38*mm

    # Contact footer
    rect(c, 0, 0, W, 14*mm, fill=GOLD)
    text(c, "trading@blackslon.org    ·    blackslon.org    ·    blackslon.org/markets",
         W / 2, 4*mm, size=13, color=black, bold=True, align="center")

    c.showPage()


# ══════════════════════════════════════════════════════════════════════════════
def build():
    c = canvas.Canvas(OUT, pagesize=(W, H))
    c.setTitle("BlackSlon Protocol — Pitch Deck 2026")
    c.setAuthor("BlackSlon Protocol")
    c.setSubject("Seed Round Pitch Deck")

    cover(c)
    problem(c)
    solution(c)
    product(c)
    market(c)
    bizmodel(c)
    traction(c)
    competition(c)
    team(c)
    roadmap(c)
    ask(c)

    c.save()
    print(f"Saved: {OUT}")


if __name__ == "__main__":
    build()
