export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem("state", serializedState);
    } catch (err) {
        //
    }
};

export const clearProjectState = () => {
    try {
        const serializedState = sessionStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        const parsedSessionState = JSON.parse(serializedState);
        const newSessionState = {...parsedSessionState};
        newSessionState.project.item.data = {};
        sessionStorage.setItem("state", JSON.stringify(newSessionState));
    } catch (err) {
        console.log('Error occured')
    }
};

