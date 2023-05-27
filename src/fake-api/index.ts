import { serviceTabs } from "@/shared/tabs";
import { methodForm } from "@/shared/forms";

const serviceForm = {
  name: "FormBuilder",
  title: "{name} Service",
  props: {
    name: "serviceForm",
    api: {
      getModel: {
        name: "LoadService",
        initialData: {
          variants: [],
        },
        validation: [
          {
            name: "uid",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
            ],
          },
        ],
      },
      saveModel: {
        name: "SaveService",
        validation: [
          {
            name: "uid",
            validationType: "string",
          },
          {
            name: "version",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
            ],
          },
          {
            name: "name",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
              {
                type: "min",
                params: [3, "ahtung"],
              },
            ],
          },
          {
            name: "description",
            validationType: "string",
          },
          {
            name: "variants.0.name",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
              {
                type: "min",
                params: [5, "ahtung"],
              },
            ],
          },
          {
            name: "variants.0.description",
            validationType: "string",
          },
          {
            name: "variants.0.uid",
            validationType: "string",
          },
          {
            name: "variants.0.type",
            validationType: "string",
          },
        ],
      },
    },
    widgets: [
      {
        name: "HiddenControl",
        props: {
          name: "uid",
        },
      },
      {
        name: "TextControl",
        width: 1,
        props: {
          name: "version",
          label: "Version",
        },
      },
      {
        name: "TextControl",
        width: 1,
        props: {
          name: "name",
          label: "Service name",
        },
      },
      {
        name: "TextAreaControl",
        props: {
          name: "description",
          label: "Description",
        },
      },
      {
        name: "ArrayControl",
        props: {
          name: "variants",
          type: 1,
          caption: {
            title: "Variants",
            actions: [
              {
                type: "ADD_INLINE_ROW",
                value: "variants",
                title: "Create variant",
              },
            ],
          },
          widgets: [
            {
              name: "TextControl",
              width: 2,
              props: {
                name: "name",
                label: "Name",
              },
              validationType: "string",
              validations: [
                {
                  type: "required",
                  params: ["Required"],
                },
                {
                  type: "min",
                  params: [5, "ahtung"],
                },
              ],
            },
            {
              name: "ButtonGroupControl",
              width: 1,
              props: {
                name: "type",
                label: "Variant type",
                isNumeric: true,
                /*options: Object.entries(variantTypes().StrToValue || {}).map(
                                  ([title, value]) => ({
                                    title: variantTypes().ValueToStr[value],
                                    value: Number(value),
                                  })
                                ),*/
              },
              validationType: "number",
              validations: [
                {
                  type: "required",
                  params: ["Required"],
                },
              ],
            },
            {
              name: "TextAreaControl",
              width: 0,
              props: {
                name: "description",
                label: "Description",
              },
            },
          ],
          columns: [
            {
              title: "Name",
              type: "DefaultNameCell",
              props: {
                title: "{name}",
                subTitle: "{description}",
                icon: "paperAirplane",
                action: {
                  type: "OPEN_ROW_FOR_EDIT",
                },
              },
            },
            {
              title: "Actions",
              type: "ActionsCell",
              props: {
                actions: [
                  {
                    type: "DELETE_INLINE_ROW",
                    title: "delete",
                    icon: "trash",
                    value: "variants",
                  },
                ],
              },
            },
          ],
          itemsPath: "items",
        },
      },
      {
        name: "FormActions",
        width: 0,
        props: {
          actions: [
            {
              type: "SUBMIT_FORM",
              title: "Save service",
              icon: "checkBadge",
              props: {
                name: "serviceForm",
              },
              refetchMethod: "LoadService",
            },
          ],
        },
      },
    ],
  },
};

const modelForm = {
  name: "FormBuilder",
  title: "{name} Service",
  props: {
    name: "modelForm",
    api: {
      getModel: {
        name: "LoadModel",
        initialData: {
          fields: [],
        },
        validation: [
          {
            name: "uid",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
            ],
          },
          {
            name: "service_uid",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
            ],
          },
        ],
      },
      saveModel: {
        name: "SaveModel",
        validation: [
          {
            name: "uid",
            validationType: "string",
          },
          {
            name: "service_uid",
            validationType: "string",
          },
          {
            name: "name",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
            ],
          },
          {
            name: "with_memstore",
            validationType: "boolean",
          },
          { name: "with_replication", validationType: "boolean" },
          {
            name: "description",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
              {
                type: "min",
                params: [5, "ahtung"],
              },
            ],
          },
          {
            name: "fields.0.name",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
            ],
          },
        ],
      },
    },
    widgets: [
      {
        name: "HiddenControl",
        props: {
          name: "uid",
        },
      },
      {
        name: "HiddenControl",
        props: {
          name: "service_uid",
        },
      },
      {
        name: "TextControl",
        width: 1,
        props: {
          name: "name",
          label: "Model name",
        },
      },
      {
        name: "CheckboxControl",
        width: 1,
        props: {
          name: "with_memstore",
          label: "With memstore",
        },
      },
      {
        name: "CheckboxControl",
        width: 1,
        props: {
          name: "with_replication",
          label: "With replication",
        },
      },
      {
        name: "TextAreaControl",
        props: {
          name: "description",
          label: "Description",
        },
      },
      {
        name: "ArrayControl",
        props: {
          name: "fields",
          type: 1,
          caption: {
            title: "Fields",
            actions: [
              {
                type: "ADD_INLINE_ROW",
                value: "fields",
                title: "Create field",
                props: {
                  name: "",
                  type: 13,
                  description: "",
                  fields: [],
                },
              },
            ],
          },
          widgets: [
            {
              name: "ButtonGroupControl",
              width: 0,
              props: {
                name: "type",
                label: "Field type",
                isNumeric: true,
                /*options: Object.entries(fieldTypes().StrToValue || {}).map(
                  ([title, value]) => ({
                    title: fieldTypes().ValueToStr[value],
                    value: Number(value),
                  })
                ),*/
              },
              validationType: "number",
              validations: [
                {
                  type: "required",
                  params: ["Required"],
                },
              ],
            },
            {
              name: "TextControl",
              width: 2,
              props: {
                name: "name",
                label: "Name",
              },
              validationType: "string",
              validations: [
                {
                  type: "required",
                  params: ["Required"],
                },
                {
                  type: "min",
                  params: [5, "ahtung"],
                },
              ],
            },
            {
              name: "TextControl",
              width: 1,
              props: {
                name: "db_name",
                label: "Database name",
              },
              validationType: "string",
              validations: [
                {
                  type: "required",
                  params: ["Required"],
                },
                {
                  type: "min",
                  params: [5, "ahtung"],
                },
              ],
            },
            {
              name: "TextAreaControl",
              width: 0,
              props: {
                name: "description",
                label: "Description",
              },
            },
          ],
          columns: [
            {
              title: "Name",
              type: "DefaultNameCell",
              props: {
                title: "{name}",
                subTitle: "{description}",
                icon: "queueList",
                action: {
                  type: "OPEN_ROW_FOR_EDIT",
                },
              },
            },
            {
              title: "DB Name",
              type: "Default",
              props: {
                title: "{db_name}",
              },
            },
            {
              title: "Actions",
              type: "ActionsCell",
              props: {
                actions: [
                  {
                    type: "DELETE_INLINE_ROW",
                    title: "delete",
                    icon: "trash",
                    value: "fields",
                  },
                ],
              },
            },
          ],
          itemsPath: "items",
        },
      },
    ],
  },
};

export const ListRoute = async () => {
  return [
    {
      title: "Dashboard",
      icon: "chartPie",
      base: true,
      inSideMenu: true,
      path: "/",
      page: "dashboard",
    },
    {
      title: "Services",
      icon: "cloudArrowUp",
      inSideMenu: true,
      path: "/services",
      page: "services",
    },
    {
      path: "/services/:uid",
      page: "service",
    },
    {
      path: "/services/:service_uid/models",
      page: "models",
    },
    {
      path: "/services/:service_uid/methods",
      page: "methods",
    },
    /* {
      title: "Config",
      itemClass: "mt-auto",
      icon: "cog_8Tooth",
      path: "/config",
      inSideMenu: true,
      component: PageBuilder,
      data: () => {
        const [data] = createSignal({
          name: "Project",
          widgets: [
            configForm,
            {
              name: "Table",
              props: {
                type: 0,
                source: {
                  type: 0,
                  value: "ListProject",
                },
                caption: {
                  title: "Projects",
                  actions: [
                    {
                      type: "OPEN_MODAL",
                      value: "ModalBuilder",
                      title: "Add",
                      icon: "plus",
                      props: {
                        actions: [
                          {
                            title: "Close",
                            icon: "xMark",
                            type: "CLOSE_MODAL",
                          },
                          {
                            type: "SUBMIT_FORM",
                            title: "Save",
                            icon: "checkBadge",
                            props: {
                              name: "projectForm",
                            },
                          },
                        ],
                        widgets: [projectForm],
                      },
                    },
                  ],
                },
                columns: [
                  {
                    title: "Name",
                    type: "DefaultNameCell",
                    props: {
                      title: "{name}",
                      subTitle: "{uid}",
                      icon: "playCircle",
                      action: {
                        type: "OPEN_MODAL",
                        value: "ModalBuilder",
                        title: "Add",
                        icon: "plus",
                        props: {
                          actions: [
                            {
                              type: "CLOSE_MODAL",
                              title: "Close",
                              icon: "xMark",
                            },
                            {
                              type: "SUBMIT_FORM",
                              title: "Save",
                              icon: "checkBadge",
                              props: {
                                name: "projectForm",
                              },
                            },
                          ],
                          initialData: {
                            uid: "{uid}",
                          },
                          widgets: [projectForm],
                        },
                      },
                    },
                  },
                  {
                    title: "Actions",
                    type: "ActionsCell",
                    props: {
                      actions: [
                        {
                          type: "REMOVE_RPC",
                          title: "delete",
                          method: "DeleteProject",
                          refetchMethod: "ListProject",
                          arguments: {
                            uid: "{uid}",
                          },
                        },
                      ],
                    },
                  },
                ],
                itemsPath: "items",
              },
            },
          ],
        });
        return data();
      },
    },*/
  ];
};

export const LoadPage = async ({ page }) => {
  switch (page) {
    case "dashboard":
      return {
        widgets: [{ name: "UIBuilder", props: {} }],
      };
    case "services":
      return {
        name: "Services",
        widgets: [
          {
            name: "Table",
            props: {
              type: 0, //TableType.Regular,
              source: {
                type: 0, //SourceType.ApiMethod,
                value: "ListService",
              },
              caption: {
                title: "Services",
                actions: [
                  {
                    type: "OPEN_MODAL",
                    value: "ModalBuilder",
                    title: "Add",
                    icon: "plus",
                    props: {
                      actions: [
                        {
                          type: "CLOSE_MODAL",
                          title: "Close",
                          icon: "xMark",
                        },
                        {
                          type: "SUBMIT_FORM",
                          title: "Save",
                          icon: "checkBadge",
                          props: {
                            name: "serviceForm",
                          },
                        },
                      ],
                      widgets: [serviceForm],
                    },
                  },
                ],
              },
              columns: [
                {
                  title: "Name",
                  type: "DefaultNameCell",
                  props: {
                    title: "{name}",
                    subTitle: "{uid}",
                    icon: "cloudArrowDown",
                    action: {
                      type: "OPEN_PAGE",
                      value: "/services/{uid}",
                    },
                  },
                },
                {
                  title: "Actions",
                  type: "ActionsCell",
                  props: {
                    actions: [
                      {
                        type: "REMOVE_RPC",
                        title: "delete",
                        method: "DeleteService",
                        refetchMethod: "ListService",
                        arguments: {
                          uid: "{uid}",
                        },
                      },
                    ],
                  },
                },
              ],
              itemsPath: "items",
            },
          },
        ],
      };
    case "service":
      return {
        name: "Service",
        widgets: [serviceTabs, serviceForm],
      };
    case "models":
      return {
        name: "Models",
        widgets: [
          serviceTabs,
          {
            name: "Table",
            props: {
              type: 0,
              source: {
                type: 0,
                value: "ListModel",
                arguments: { service_uid: "{service_uid}" },
              },
              caption: {
                title: "Models",
                actions: [
                  {
                    type: "OPEN_MODAL",
                    value: "ModalBuilder",
                    title: "Add",
                    icon: "plus",
                    props: {
                      initialData: {
                        service_uid: "{uid}",
                      },
                      actions: [
                        {
                          type: "CLOSE_MODAL",
                          title: "Close",
                          icon: "xMark",
                        },
                        {
                          type: "SUBMIT_FORM",
                          title: "Save",
                          icon: "checkBadge",
                          props: {
                            name: "modelForm",
                          },
                        },
                      ],
                      widgets: [modelForm],
                    },
                  },
                ],
              },
              columns: [
                {
                  title: "Name",
                  type: "DefaultNameCell",
                  props: {
                    title: "{name}",
                    subTitle: "{uid}",
                    icon: "circleStack",
                    action: {
                      type: "OPEN_MODAL",
                      value: "ModalBuilder",
                      title: "Add",
                      icon: "plus",
                      props: {
                        initialData: {
                          uid: "{uid}",
                          service_uid: "{service_uid}",
                        },
                        actions: [
                          {
                            type: "CLOSE_MODAL",
                            title: "Close",
                            icon: "xMark",
                          },
                          {
                            type: "SUBMIT_FORM",
                            title: "Save",
                            icon: "checkBadge",
                            props: {
                              name: "modelForm",
                            },
                          },
                        ],
                        widgets: [modelForm],
                      },
                    },
                  },
                },
                {
                  title: "Actions",
                  type: "ActionsCell",
                  props: {
                    actions: [
                      {
                        type: "REMOVE_RPC",
                        title: "delete",
                        icon: "trash",
                        method: "DeleteModel",
                        arguments: {
                          uid: "{uid}",
                          service_uid: "{service_uid}",
                        },
                      },
                    ],
                  },
                },
              ],
              itemsPath: "items",
            },
          },
        ],
      };
    case "methods":
      return {
        name: "Methods",
        widgets: [
          serviceTabs,
          {
            name: "Table",
            props: {
              type: 0,
              source: {
                type: 0,
                value: "ListMethod",
                arguments: { service_uid: "{uid}" },
              },
              caption: {
                title: "Methods",
                actions: [
                  {
                    type: "OPEN_MODAL",
                    value: "ModalBuilder",
                    title: "Add",
                    icon: "plus",
                    props: {
                      actions: [
                        {
                          type: "CLOSE_MODAL",
                          title: "Close",
                          icon: "xMark",
                        },
                        {
                          type: "SUBMIT_FORM",
                          title: "Save",
                          icon: "checkBadge",
                          props: {
                            name: "methodForm",
                          },
                        },
                      ],
                      widgets: [methodForm],
                    },
                  },
                ],
              },
              columns: [
                {
                  title: "Name",
                  type: "DefaultNameCell",
                  props: {
                    title: "{name}",
                    subTitle: "{uid}",
                    icon: "circleStack",
                    action: {
                      type: "OPEN_MODAL",
                      value: "ModalBuilder",
                      title: "Add",
                      icon: "plus",
                      props: {
                        initialData: {
                          uid: "{uid}",
                          service_uid: "{service_uid}",
                        },
                        actions: [
                          {
                            type: "CLOSE_MODAL",
                            title: "Close",
                            icon: "xMark",
                          },
                          {
                            type: "SUBMIT_FORM",
                            title: "Save",
                            icon: "checkBadge",
                            props: {
                              name: "methodForm",
                            },
                          },
                        ],
                        widgets: [methodForm],
                      },
                    },
                  },
                },
                {
                  title: "Actions",
                  type: "ActionsCell",
                  props: {
                    actions: [
                      {
                        type: "REMOVE_RPC",
                        title: "delete",
                        icon: "trash",
                        method: "DeleteModel",
                        arguments: {
                          uid: "{uid}",
                          service_uid: "{service_uid}",
                        },
                      },
                    ],
                  },
                },
              ],
              itemsPath: "items",
            },
          },
        ],
      };
  }
};

const sampleService = {
  uid: "123",
  name: "sample",
  version: "v0.0.1",
  description: "Just for test",
  variants: [
    {
      name: "test variant",
    },
  ],
};
const sampleModel = {
  uid: "345",
  service_uid: "123",
  name: "sample",
  version: "v0.0.1",
  description: "Just for test",
  with_memstore: true,
  fields: [
    {
      name: "test variant",
      type: 13,
    },
  ],
};

export const ListService = async () => ({ items: [sampleService] });
export const ListModel = async ({ service_uid }) => ({
  items: [sampleModel],
});
export const LoadModel = async () => ({ item: sampleModel });
export const LoadService = async () => ({ item: sampleService });
export const SaveService = async ({ values }) => ({});
export const SaveModel = async ({ values }) => ({});
export const GetEnumLists = async ({ name }) => ({ items: [] });
