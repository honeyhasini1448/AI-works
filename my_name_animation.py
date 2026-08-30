import turtle
import time

# Screen setup
screen = turtle.Screen()
screen.bgcolor("black")
screen.title("LED Text Animation - Hasini Madasu")

# Create turtle
pen = turtle.Turtle()
pen.hideturtle()
pen.penup()

# Larger font size
font_size = 60

# Fade-in colors (dark to bright)
fade_colors = [
    "#111111",
    "#222222",
    "#333333",
    "#444444",
    "#666666",
    "#888888",
    "#AAAAAA",
    "#FFFFFF"
]

# LED colors
colors = [
    "red",
    "orange",
    "yellow",
    "lime",
    "cyan",
    "blue",
    "magenta",
    "pink"
]

# Position
pen.goto(0, -40)

# ---------------- FADE IN EFFECT ----------------

for color in fade_colors:
    pen.clear()
    pen.color(color)

    pen.goto(0, -40)
    pen.write(
        "Hasini Madasu",
        align="center",
        font=("Arial", font_size, "bold")
    )

    time.sleep(0.2)


# ---------------- LED COLOR ANIMATION ----------------

color_index = 0

while True:
    pen.clear()

    pen.color(colors[color_index])

    pen.goto(0, -40)
    pen.write(
        "Hasini Madasu",
        align="center",
        font=("Arial", font_size, "bold")
    )

    color_index = (color_index + 1) % len(colors)

    time.sleep(0.4)