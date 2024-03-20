const getLanguage = (keys) => {
    try {
        if (!localStorage.getItem('reloadLoadDone')) {
            return null;
        }
        const value = localStorage.length;
        let currentLanguage = null;
        if (value > 0) {
            keys.forEach((key) => {
            if (localStorage.getItem(key)) {
                    currentLanguage = localStorage.getItem(key);
                }
            });
        }
        localStorage.clear();
        if (currentLanguage !== null) {
            localStorage.setItem(currentLanguage, currentLanguage);
        }
        return currentLanguage;
    } catch {
        return null;
    }
}

const setLanguage = (key, value) => {
    try {
        localStorage.clear();
        localStorage.setItem(key, value);
    } catch {
        return null;
    }
}

const useLocalStorage = (value) => {
    return [getLanguage, setLanguage];
}
export default useLocalStorage;