const serviceTabs = {
  name: "PageTabs",
  props: {
    params: { uid: "{uid}", service_uid: "{service_uid}" },
    options: [
      {
        isBackLink: true,
        title: "Services",
        href: "/services",
      },
      {
        title: "Service settings",
        href: "/services/{uid}{service_uid}",
      },
      {
        title: "Models",
        href: "/services/{uid}{service_uid}/models",
      },
      {
        title: "Methods",
        href: "/services/{uid}{service_uid}/methods",
      },
    ],
  },
};

export { serviceTabs };
