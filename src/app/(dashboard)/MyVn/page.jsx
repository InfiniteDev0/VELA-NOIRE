"use client";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  User,
  ShoppingBag,
  Heart,
  CalendarDays,
  Sparkles,
  ScrollText,
  LogOut,
  ChevronRight,
  Pencil,
  Plus,
} from "lucide-react";
import Link from "next/link";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "account", label: "My Account" },
  { id: "orders", label: "My Orders" },
  { id: "wishlist", label: "My Wishlist" },
  { id: "appointments", label: "My Appointments" },
  { id: "care", label: "My Care Service" },
  { id: "certificates", label: "My Certificates" },
];

// ── Initials avatar ─────────────────────────────────────────────
function Avatar({ name }) {
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "VN";

  return (
    <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center mx-auto mb-4">
      <span className="text-xl font-semibold tracking-widest text-zinc-700">
        {initials}
      </span>
    </div>
  );
}

// ── Section card ─────────────────────────────────────────────────
function Card({ title, children, action }) {
  return (
    <div className="border-t border-zinc-200 pt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold tracking-widest uppercase text-zinc-800">
          {title}
        </h3>
        {action && (
          <button className="text-xs underline underline-offset-4 text-zinc-500 hover:text-black transition-colors flex items-center gap-1">
            {action.icon && <action.icon className="w-3 h-3" />}
            {action.label}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyState({ message, cta, href }) {
  return (
    <div className="py-4">
      <p className="text-sm text-zinc-400">{message}</p>
      {cta && href && (
        <Link
          href={href}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          {cta} <ChevronRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
}

// ── Tab panels ────────────────────────────────────────────────────
function OverviewPanel({ user, setTab }) {
  return (
    <div className="space-y-10s">
      <Card
        title="My Account"
        action={{ label: "Edit my profile", icon: Pencil }}
      >
        <p className="text-sm text-zinc-500">
          Login:{" "}
          <span className="text-zinc-800 font-medium">{user?.email}</span>
        </p>
      </Card>

      <Card title="My Wishlist">
        <EmptyState
          message="Your wishlist is empty."
          cta="Start shopping"
          href="/"
        />
      </Card>

      <Card title="My Care Service">
        <EmptyState message="No products currently in Care Service." />
        <Link
          href="#"
          className="mt-2 text-xs underline underline-offset-4 text-zinc-500 hover:text-black transition-colors"
        >
          Contact client services
        </Link>
      </Card>

      <Card title="My Orders">
        <EmptyState
          message="There are no current orders."
          cta="Start shopping"
          href="/"
        />
      </Card>

      <Card title="My Appointments">
        <EmptyState message="You have no upcoming appointments." />
        <Link
          href="#"
          className="mt-2 text-xs underline underline-offset-4 text-zinc-500 hover:text-black transition-colors"
        >
          Book in-store appointment
        </Link>
      </Card>

      <Card title="My Certificates">
        <EmptyState message="You currently don't have any certificates." />
        <button className="mt-2 text-xs underline underline-offset-4 text-zinc-500 hover:text-black transition-colors flex items-center gap-1">
          <Plus className="w-3 h-3" /> Add a new Certificate
        </button>
      </Card>
    </div>
  );
}

function AccountPanel({ user }) {
  return (
    <div className="space-y-6">
      <Card
        title="Personal Information"
        action={{ label: "Edit", icon: Pencil }}
      >
        <div className="space-y-2">
          <p className="text-sm text-zinc-500">
            Name:{" "}
            <span className="text-zinc-800 font-medium">{user?.name}</span>
          </p>
          <p className="text-sm text-zinc-500">
            Email:{" "}
            <span className="text-zinc-800 font-medium">{user?.email}</span>
          </p>
        </div>
      </Card>
      <Card title="Terms & Conditions">
        <Link
          href="#"
          className="text-xs underline underline-offset-4 text-zinc-500 hover:text-black transition-colors"
        >
          View Terms and Conditions
        </Link>
      </Card>
    </div>
  );
}

function PlaceholderPanel({ icon: Icon, title, message, cta, href }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <Icon className="w-10 h-10 text-zinc-300" />
      <h3 className="text-sm font-semibold tracking-widest uppercase text-zinc-700">
        {title}
      </h3>
      <p className="text-sm text-zinc-400 max-w-xs">{message}</p>
      {cta && href && (
        <Link
          href={href}
          className="mt-2 text-xs font-semibold tracking-wider uppercase underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          {cta}
        </Link>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────
const MyVnPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const renderPanel = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPanel user={user} setTab={setActiveTab} />;
      case "account":
        return <AccountPanel user={user} />;
      case "orders":
        return (
          <PlaceholderPanel
            icon={ShoppingBag}
            title="My Orders"
            message="There are no current orders."
            cta="Start shopping"
            href="/"
          />
        );
      case "wishlist":
        return (
          <PlaceholderPanel
            icon={Heart}
            title="My Wishlist"
            message="Your wishlist is empty."
            cta="Discover the collection"
            href="/"
          />
        );
      case "appointments":
        return (
          <PlaceholderPanel
            icon={CalendarDays}
            title="My Appointments"
            message="You have no upcoming appointments."
            cta="Book an in-store appointment"
            href="#"
          />
        );
      case "care":
        return (
          <PlaceholderPanel
            icon={Sparkles}
            title="My Care Service"
            message="No products currently in Care Service."
          />
        );
      case "certificates":
        return (
          <PlaceholderPanel
            icon={ScrollText}
            title="My Certificates"
            message="You currently don't have any certificates."
            cta="Add a new Certificate"
            href="#"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero banner — dark luxury header */}
      <div className="relative h-48 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/myvn-banner.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-0">
          <Avatar name={user?.name} />
        </div>
      </div>

      {/* Name */}
      <div className="text-center py-4 border-b border-zinc-100">
        <h1 className="text-sm font-semibold tracking-[0.25em] uppercase text-zinc-800">
          {user?.name?.toUpperCase() || "MY ACCOUNT"}
        </h1>
      </div>

      {/* Tab nav — horizontal scroll on mobile */}
      <nav className="border-b border-zinc-200 overflow-x-auto">
        <ul className="flex min-w-max mx-auto px-6">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-xs tracking-widest uppercase font-medium whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-black text-black"
                    : "border-transparent text-zinc-400 hover:text-zinc-700"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">{renderPanel()}</div>

      {/* Logout */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-zinc-400 hover:text-black transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
};

export default MyVnPage;
