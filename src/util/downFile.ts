export default async function (str: string, filename: string, types: any = [{
    description: "text file",
    accept: {
        "text/plain": [".txt"],
    },
}]) {
    try {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: filename,
            types: types,
        });
        const blob = new Blob([str]);
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
        return fileHandle;
    } catch (err: any) {
        console.log(err.toString());
    }
}