const fs = require('fs');



const filesToCopy = [
  { src: 'src/proxy-server.mjs', dest: 'dist/project/proxy-server.mjs' },
];

// Function to copy files
const copyFiles = () => {
  filesToCopy.forEach(({ src, dest }) => {
    if (fs.existsSync(src)) {
      fs.copyFile(src, dest, (err) => {
        if (err) {
          console.error(`Error copying ${src}:`, err);
        } else {
          console.log(`Copied ${src} to ${dest}`);
        }
      });
    } else {
      console.error(`Source file does not exist: ${src}`);
    }
  });
};

// Execute the copy operation
copyFiles();
