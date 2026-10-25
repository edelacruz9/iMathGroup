// downloads.save({ filename, data }) — data may be a Blob, ArrayBuffer, Uint8Array, data URL or text.
export function createDownloads() {
  return {
    async save({ filename, data }) {
      let blob;
      if (data instanceof Blob) blob = data;
      else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) blob = new Blob([data]);
      else if (typeof data === "string" && data.startsWith("data:")) blob = await (await fetch(data)).blob();
      else blob = new Blob([String(data)], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = Object.assign(document.createElement("a"), { href: url, download: filename });
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    },
  };
}
