import { createSignal, Match, Switch } from "solid-js";
import { tw } from "typewind";

export type PromptButtonProps = {
  buttonTitle: string;
  onAcceptClick?: () => void;
  onDeclineClick?: () => void;
};

export function PromptButton({
  buttonTitle = "",
  onAcceptClick,
  onDeclineClick,
}: PromptButtonProps) {
  const [requested, setRequested] = createSignal(false);
  return (
    <div class={tw.flex.justify_end.space_x_2}>
      <Switch>
        <Match when={!requested()}>
          <button
            class={tw.btn.btn_error.btn_outline.btn_sm.normal_case}
            onClick={(event) => {
              event.preventDefault();
              setRequested(true);
            }}
          >
            {buttonTitle}
          </button>
        </Match>
        <Match when={requested()}>
          <button
            class={tw.btn.btn_outline.btn_sm.btn_warning.normal_case}
            onClick={(event) => {
              event.preventDefault();
              setRequested(false);
              onAcceptClick && onAcceptClick();
            }}
          >
            yes
          </button>
          <button
            class={tw.btn.btn_outline.btn_sm.normal_case}
            onClick={(event) => {
              event.preventDefault();
              setRequested(false);
              onDeclineClick && onDeclineClick();
            }}
          >
            no
          </button>
        </Match>
      </Switch>
    </div>
  );
}
