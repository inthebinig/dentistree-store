import React from "react";
import { TreePine } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-20">
      <div className="section py-10 grid sm:grid-cols-2 gap-6 text-sm text-steel">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TreePine size={18} className="text-pine" />
            <span className="font-display font-semibold text-pine">DentisTree</span>
          </div>
          <p>Endodontic and dental supply, stocked and shipped fast.</p>
        </div>
        <div className="sm:text-right">
          {/* TODO: replace with your real business details */}
          <p>123 Practice Ave, Suite 4 · Your City, ST 00000</p>
          <p>(000) 000-0000 · orders@dentistreestore.com</p>
        </div>
      </div>
      <div className="section py-4 border-t border-line/60 text-xs text-steel/80">
        © {new Date().getFullYear()} DentisTree. All rights reserved.
      </div>
    </footer>
  );
}
