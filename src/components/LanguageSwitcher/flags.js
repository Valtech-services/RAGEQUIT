/* =====================================================================
   flags.js — Drapeaux SVG inline (aucune dépendance npm)
   Chaque drapeau est un mini SVG 4:3 en couleur.
   ===================================================================== */
import React from 'react'

const flags = {
  gb: (
    <svg viewBox="0 0 60 30" className="flag-svg"><clipPath id="t"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="s"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clipPath="url(#t)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/><path d="M0 0l60 30m0-30L0 30" clipPath="url(#s)" stroke="#C8102E" strokeWidth="4"/><path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/></g></svg>
  ),
  fr: (
    <svg viewBox="0 0 3 2" className="flag-svg"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>
  ),
  es: (
    <svg viewBox="0 0 3 2" className="flag-svg"><rect width="3" height="2" fill="#AA151B"/><rect y="0.5" width="3" height="1" fill="#F1BF00"/></svg>
  ),
  pt: (
    <svg viewBox="0 0 6 4" className="flag-svg"><rect width="6" height="4" fill="#FF0000"/><rect width="2.4" height="4" fill="#006600"/><circle cx="2.4" cy="2" r="0.7" fill="#FFFF00" stroke="#fff" strokeWidth="0.08"/></svg>
  ),
  de: (
    <svg viewBox="0 0 5 3" className="flag-svg"><rect width="5" height="3" fill="#FFCE00"/><rect width="5" height="2" fill="#DD0000"/><rect width="5" height="1" fill="#000"/></svg>
  ),
  it: (
    <svg viewBox="0 0 3 2" className="flag-svg"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#CE2B37"/></svg>
  ),
  nl: (
    <svg viewBox="0 0 9 6" className="flag-svg"><rect width="9" height="6" fill="#fff"/><rect width="9" height="2" fill="#AE1C28"/><rect y="4" width="9" height="2" fill="#21468B"/></svg>
  ),
  pl: (
    <svg viewBox="0 0 8 5" className="flag-svg"><rect width="8" height="5" fill="#DC143C"/><rect width="8" height="2.5" fill="#fff"/></svg>
  ),
  tr: (
    <svg viewBox="0 0 12 8" className="flag-svg"><rect width="12" height="8" fill="#E30A17"/><circle cx="4.5" cy="4" r="2" fill="#fff"/><circle cx="5.1" cy="4" r="1.6" fill="#E30A17"/><path d="M7 4l1.9-.6-1.2 1.6V3l1.2 1.6z" fill="#fff"/></svg>
  ),
  ru: (
    <svg viewBox="0 0 9 6" className="flag-svg"><rect width="9" height="6" fill="#fff"/><rect y="2" width="9" height="2" fill="#0039A6"/><rect y="4" width="9" height="2" fill="#D52B1E"/></svg>
  ),
  sa: (
    <svg viewBox="0 0 12 8" className="flag-svg"><rect width="12" height="8" fill="#006C35"/><rect x="2" y="3.5" width="8" height="0.6" fill="#fff"/><rect x="4" y="5" width="4" height="0.8" fill="#fff" rx="0.1"/></svg>
  ),
  jp: (
    <svg viewBox="0 0 9 6" className="flag-svg"><rect width="9" height="6" fill="#fff"/><circle cx="4.5" cy="3" r="1.8" fill="#BC002D"/></svg>
  ),
}

export default function Flag({ country }) {
  return <span className="flag-wrap">{flags[country] || null}</span>
}
