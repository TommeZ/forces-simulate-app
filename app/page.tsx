"use client";

import { RoleSelect } from "@/components/RoleSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  console.log({ name, role });

  return (
    <div className="flex flex-col flex-1 items-center justify-between bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            See how you look in the Armed Forces
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking the start a career in the British Armed Forces? Head over to{" "}
            <a
              href="https://recruitment.raf.mod.uk/find-your-role"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Royal Air Force
            </a>{" "}
            or{" "}
            <a
              href="https://jobs.army.mod.uk/regular-army/types-of-roles/"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Army
            </a>
          </p>
          <div className="flex flex-col gap-1.5 w-full">
            <Label>Name</Label>
            <Input onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <Label>Military Role</Label>
            <RoleSelect onChange={(value) => setRole(value)} />
          </div>
          <div className="App">
            <Label>Upload Image</Label>
            <input type="file" onChange={handleChange} />
            {file && <img src={file} alt="Uploaded preview" />}
          </div>

          <div>
            <Button disabled={!name || !role || !file}>Generate</Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row"></div>
      </main>
    </div>
  );
}
