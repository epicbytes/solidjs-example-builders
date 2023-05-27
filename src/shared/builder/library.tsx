import { lazy } from "solid-js";

export const Library: Record<string, any> = {
  Table: lazy(() =>
    import("@/shared/ui/datalists/table/table").then((res) => ({
      default: res.Table,
    }))
  ),
  DefaultNameCell: lazy(() =>
    import("@/shared/ui/datalists/cells/default-name-cell").then((res) => ({
      default: res.DefaultNameCell,
    }))
  ),
  ActionsCell: lazy(() =>
    import("@/shared/ui/datalists/cells/actions-cell").then((res) => ({
      default: res.ActionsCell,
    }))
  ),
  BadgesCell: lazy(() =>
    import("@/shared/ui/datalists/cells/badges-cell").then((res) => ({
      default: res.BadgesCell,
    }))
  ),
  HiddenControl: lazy(() =>
    import("@/shared/ui/controls-solid-form-handler/hidden-control").then(
      (res) => ({
        default: res.HiddenControl,
      })
    )
  ),
  TextControl: lazy(() =>
    import("@/shared/ui/controls-solid-form-handler/text-control").then(
      (res) => ({
        default: res.TextControl,
      })
    )
  ),
  TextAreaControl: lazy(() =>
    import("@/shared/ui/controls-solid-form-handler/textarea-control").then(
      (res) => ({
        default: res.TextAreaControl,
      })
    )
  ),
  SelectControl: lazy(() =>
    import("@/shared/ui/controls-solid-form-handler/select-control").then(
      (res) => ({
        default: res.SelectControl,
      })
    )
  ),
  AsyncSelectControl: lazy(() =>
    import("@/shared/ui/controls-solid-form-handler/async-select-control").then(
      (res) => ({
        default: res.AsyncSelectControl,
      })
    )
  ),
  CheckboxControl: lazy(() =>
    import("@/shared/ui/controls-solid-form-handler/checkbox-control").then(
      (res) => ({
        default: res.CheckboxControl,
      })
    )
  ),
  ArrayControl: lazy(() =>
    import("@/shared/ui/controls-solid-form-handler/array-control").then(
      (res) => ({
        default: res.ArrayControl,
      })
    )
  ),
  ButtonGroupControl: lazy(() =>
    import("@/shared/ui/controls-solid-form-handler/button-group-control").then(
      (res) => ({
        default: res.ButtonGroupControl,
      })
    )
  ),
  SelectPathControl: lazy(() =>
    import("@/shared/ui/controls-solid-form-handler/button-group-control").then(
      (res) => ({
        default: res.ButtonGroupControl,
      })
    )
  ),
  FormBuilder: lazy(() =>
    import("@/shared/builder/form-builder").then((res) => ({
      default: res.FormBuilder,
    }))
  ),
  PageTabs: lazy(() =>
    import("@/shared/ui/layout/page-tabs/page-tabs").then((res) => ({
      default: res.PageTabs,
    }))
  ),
  UIBuilder: lazy(() =>
    import("@/shared/builder/ui-builder").then((res) => ({
      default: res.UIBuilder,
    }))
  ),
  FormActions: lazy(() =>
    import("@/shared/ui/controls-solid-form-handler/form-actions").then(
      (res) => ({ default: res.FormActions })
    )
  ),
};
