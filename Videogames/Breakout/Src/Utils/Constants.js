// CANVAS
export const GAME_WIDTH  = 1280;
export const GAME_HEIGHT = 1920;

// PLAYER
export const PLAYER_CONFIG = {
    WIDTH:  250,
    HEIGHT: 40,
    COLOR:  "#cacaca",
    SPEED:  1500
};

// BALL
export const BALL_CONFIG = {
    WIDTH:  30,
    HEIGHT: 30,
    COLOR:  "#ffffff",
    SPEED:  700
};

// BLOCKS
export const BLOCK_CONFIG = {
    COLS:         6,
    HEIGHT:       70,
    SIDE_PADDING: 150,
    TOP_PADDING:  150,
    GAP:          5
};

// GAME
export const GAME_CONFIG = {
    LIVES:        3,
    END_COOLDOWN: 1
};

// HUD
export const DISPLAY_CONFIG = {
    HUD_Y:         100,
    FONT_MAIN:     "60px Arial",
    FONT_TITLE:    "120px Arial",
    FONT_SUBTITLE: "80px Arial",
    FONT_SMALL:    "50px Arial",
    COLOR_VICTORY:   "#fffb03",
    COLOR_GAMEOVER:  "#ff0000",
    COLOR_PRIMARY:   "#ffffff",
    COLOR_SECONDARY: "#cccccc"
};

// LEVELS
export const LEVEL_CONFIG = [
    {
        rows:   3,
        colors: ["#d80e0e", "#d86602", "#ffdb0c"]
    },
    {
        rows:   4,
        colors: ["#d80e0e", "#d86602", "#ffdb0c", "#089c28"]
    },
    {
        rows:   5,
        colors: ["#d80e0e", "#d86602", "#ffdb0c", "#089c28", "#1155e9"]
    }
];