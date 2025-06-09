import { RashScannerCard } from "@/components/dashboard/rash-scanner-card";

export default function RashScannerPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 font-headline">Rash Scanner</h1>
      <div className="max-w-2xl mx-auto">
        <RashScannerCard />
      </div>
    </div>
  );
}
