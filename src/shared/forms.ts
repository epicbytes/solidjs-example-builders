import { themes } from "@/shared/data/themes";

const methodForm = {
  name: "FormBuilder",
  title: "{name} method",
  props: {
    name: "methodForm",
    api: {
      getModel: {
        name: "LoadMethod",
        initialData: {
          input_fields: [],
          output_fields: [],
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
        name: "SaveMethod",
        validation: [
          {
            name: "uid",
            validationType: "string",
            validationTypeError: "UID must be string",
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
            name: "available_in_variants",
            validationType: "array_of_string",
            validations: [
              {
                type: "min",
                params: [0, "Required"],
              },
            ],
          },
          {
            name: "description",
            validationType: "string",
          },
          {
            name: "type",
            validationType: "number",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
            ],
          },
          {
            name: "model_id",
            validationType: "string",
          },
          {
            name: "input_fields.0.name",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
            ],
          },
          {
            name: "input_fields.0.description",
            validationType: "string",
          },
          {
            name: "output_fields.0.name",
            validationType: "string",
            validations: [
              {
                type: "required",
                params: ["Required"],
              },
            ],
          },
          {
            name: "output_fields.0.description",
            validationType: "string",
          },
          {
            name: "updated_at",
            validationType: "number",
          },
          {
            name: "created_at",
            validationType: "number",
          },
          {
            name: "deleted_at",
            validationType: "number",
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
          label: "Method name",
        },
      },
      {
        name: "ButtonGroupControl",
        width: 1,
        props: {
          name: "available_in_variants",
          label: "Available in variants",
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
          name: "input_fields",
          type: 1,
          caption: {
            title: "Input fields",
            actions: [
              {
                type: "ADD_INLINE_ROW",
                value: "input_fields",
                title: "Create field",
                props: {
                  name: "",
                  type: 13,
                  description: "",
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
              width: 2,
              props: {
                name: "validation",
                label: "Validation",
              },
              validationType: "string",
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
                  type: "EDIT_INLINE",
                },
              },
            },
            {
              title: "Actions",
              type: "ActionsCell",
              props: {
                actions: [
                  {
                    type: "DELETE_INLINE_FIELD",
                    title: "delete",
                    icon: "trash",
                    value: "input_fields",
                  },
                ],
              },
            },
          ],
          itemsPath: "items",
        },
      },
      {
        name: "ArrayControl",
        props: {
          name: "output_fields",
          type: 1,
          caption: {
            title: "Output fields",
            actions: [
              {
                type: "ADD_INLINE_ROW",
                value: "output_fields",
                title: "Create field",
                props: {
                  name: "",
                  type: 13,
                  description: "",
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
                  type: "EditInline",
                },
              },
            },
            {
              title: "Actions",
              type: "ActionsCell",
              props: {
                actions: [
                  {
                    type: "REMOVE_INLINE_FIELD",
                    title: "delete",
                    icon: "trash",
                    value: "output_fields",
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

const projectForm = {
  name: "FormBuilder",
  title: "{name} Project",
  props: {
    name: "projectForm",
    api: {
      getModel: {
        name: "LoadProject",
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
        name: "SaveProject",
        validation: [
          { name: "uid", validationType: "string" },
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
            name: "path",
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
            name: "repository",
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
            name: "domain",
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
          name: "name",
          label: "Project name",
        },
      },
      {
        name: "TextControl",
        width: 2,
        props: {
          name: "path",
          label: "Project path",
        },
      },
      {
        name: "TextControl",
        width: 2,
        props: {
          name: "repository",
          label: "Git repository",
        },
      },
      {
        name: "TextControl",
        width: 1,
        props: {
          name: "domain",
          label: "Main domain",
        },
      },
      {
        name: "TextAreaControl",
        props: {
          name: "description",
          label: "Description",
        },
      },
    ],
  },
};

const configForm = {
  name: "FormBuilder",
  title: "Main config",
  props: {
    name: "configForm",
    api: {
      getModel: {
        name: "LoadConfig",
        validation: [],
      },
      saveModel: {
        name: "SaveConfig",
        validation: [
          { name: "githubToken", validationType: "string" },
          { name: "pathVariable", validationType: "string" },
          { name: "theme", validationType: "string" },
          { name: "selectedProject", validationType: "string" },
        ],
      },
    },
    widgets: [
      {
        name: "TextControl",
        width: 0,
        props: {
          name: "githubToken",
          label: "Github token",
        },
      },
      {
        name: "TextControl",
        width: 0,
        props: {
          name: "pathVariable",
          label: "Path variable",
        },
      },
      {
        name: "SelectControl",
        width: 1,
        props: {
          name: "theme",
          label: "Theme",
          options: themes(),
        },
      },
      {
        name: "AsyncSelectControl",
        width: 2,
        props: {
          name: "selectedProject",
          label: "SelectedProject",
          hasDefaultOption: true,
          api: {
            getModel: {
              name: "ListProject",
              validation: [],
            },
          },
        },
      },
      {
        name: "FormActions",
        width: 0,
        props: {
          actions: [
            {
              type: "SUBMIT_FORM",
              title: "Save config",
              icon: "checkBadge",
              props: {
                name: "configForm",
              },
              refetchMethod: "LoadConfig",
            },
          ],
        },
      },
    ],
  },
};

export { methodForm, projectForm, configForm };
