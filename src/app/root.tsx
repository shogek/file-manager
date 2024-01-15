export function Root() {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          (window as any).electronAPI.setTitle("TEST");
        }}
      >
        Click me to change window's title
      </button>
    </div>
  );
}
