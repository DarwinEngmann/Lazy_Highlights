import { useContext } from "react";
import { ThemeContext } from "./context";
import { MouseEffects } from "./components/effects";
import { Header, BackgroundEffects } from "./components/layout";
import { Card, MediaPlayer } from "./components/ui";
import { UploadSection } from "./components/sections";
import { useFileUpload, useDragAndDrop } from "./hooks";
import { getThemeStyles } from "./utils";

function App() {
  const { theme } = useContext(ThemeContext);
  const {
    file,
    status,
    isUploading,
    uploadedAudio,
    handleUpload,
    handleFileChange,
    setFile,
    setStatus,
  } = useFileUpload();

  const { dragActive, handleDrag, handleDrop } = useDragAndDrop(
    (droppedFile) => setFile(droppedFile),
    (newStatus) => setStatus(newStatus)
  );

  const styles = getThemeStyles(theme);

  return (
    <div
      className={`min-h-screen ${styles.background} transition-all duration-1000 relative overflow-hidden`}
    >
      <BackgroundEffects theme={theme} styles={styles} />
      <MouseEffects theme={theme} />

      {/* Main Content */}
      <div className="relative z-20">
        <Header styles={styles} />

        <div className="relative z-20 px-8 pb-8">
          <Card styles={styles}>
            <UploadSection
              file={file}
              status={status}
              isUploading={isUploading}
              dragActive={dragActive}
              styles={styles}
              theme={theme}
              onFileChange={handleFileChange}
              onUpload={handleUpload}
              onDrag={handleDrag}
              onDrop={handleDrop}
            />

            <MediaPlayer uploadedAudio={uploadedAudio} styles={styles} />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
