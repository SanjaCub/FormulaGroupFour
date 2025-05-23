export const getCountryFlag = (nat, flags) => {
    const flag = flags.find(flag => flag.nationality.includes(nat));
    return flag && flag.alpha_2_code;
}

export const getCountryPrixFlag = (country, flags) => {
    if (country === "UK") {
        return "GB"
    }
    else if (country === "Korea") {
        return "KR"
    }

    else if (country === "UAE") {
        return "AE"
    }

    else if (country === "USA") {
        return "US"
    }
    else {
        const flag = flags.find(flag => flag.en_short_name === country);
        return flag && flag.alpha_2_code;
    }
}