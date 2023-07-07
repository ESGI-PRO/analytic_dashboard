const getAccount = (app) => ({
    displayName: app?.appName[0].toUpperCase() + app?.appName.slice(1),
    email: `demo@${app?.appName}.com`,
    photoURL: '/assets/images/avatars/avatar_default.jpg',
});

export default getAccount;
