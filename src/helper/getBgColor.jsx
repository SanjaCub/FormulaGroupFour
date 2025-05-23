export const getBgColor = (position) => {
    if (position === 0) {
        return "lightcyan";
    } else if (position === 1) {
        return "#f7f765";
    } else if (position === 2) {
        return "hsl(313, 64%, 81%)";
    } else if (position === 3) {
        return "#f3bd58";
    } else if (position === 4) {
        return " #9cf19c"
    } else if (position === 5) {
        return "hwb(190 72% 9%)"
    } else if (position === 6) {
        return " #f6dc4a"
    } else if (position === 7) {
        return " hwb(0 64% 6%"
    } else if (position === 8) {
        return "#eeb64e"
    } else if (position === 9) {
        return "#9ef39e"
    } else if (position === 10) {
        return "hsl(15, 75%, 62%)"
    } else {
        return "hsl(60, 5%, 65%)"
    }
}