import { dataleak } from "./dataleak";
import { vulnerability } from "./vulnerability";

export interface Report {
  idsummary: string; // Identificatore univoco del report
  domain_name: string; // Nome del dominio analizzato
  risk_score: number; // Punteggio complessivo di rischio (0-100)
  creation_date: string; // Data di creazione del report
  last_edit: string; // Data dell'ultima modifica al report
  summary_text: string; // Testo riassuntivo del report in italiano
  summary_text_en: string; // Testo riassuntivo del report in inglese

  // Punteggi specifici di sicurezza (0-100)
  servizi_esposti_score: number;
  dataleak_score: number;
  rapporto_leak_email_score: number;
  spoofing_score: number;
  open_ports_score: number;
  blacklist_score: number;
  vulnerability_score_active: number;
  vulnerability_score_passive: number;
  certificate_score: number;

  // Dettagli numerici
  n_port: { [port: string]: { n: number } }; // Numero di esposizioni per ciascuna porta
  n_cert_attivi: number; // Numero di certificati SSL/TLS attivi
  n_cert_scaduti: number; // Numero di certificati SSL/TLS scaduti
  n_asset: number; // Numero totale di asset analizzati
  n_similar_domains: number; // Numero di domini simili identificati
  unique_ipv4: number; // Numero di indirizzi IPv4 unici
  unique_ipv6: number; // Numero di indirizzi IPv6 unici

  // Dettagli sulla sicurezza email
  email_security: {
    spoofable: string; // Politica DMARC configurata
    blacklist_detections: string; // Politica DMARC configurata
    blacklist_total_list: number; // Politica DMARC configurata
    blacklist_detected_list: string[]; // Politica DMARC configurata
    dmarc_policy: string; // Politica DMARC configurata
    spoofing_vulnerability: boolean; // Vulnerabilità allo spoofing

  };
  // Dettagli sui data leak rilevati
  n_dataleak: {
    total: dataleak;
    resolved: dataleak;
    unresolved: dataleak;
    enumeration: number;
  };

  // Dettagli sulle vulnerabilità rilevate
  n_vulns: {
    total: vulnerability;
    active: vulnerability;
    passive: vulnerability;
  };

  // Dettagli sul WAF (Web Application Firewall)
  waf: {
    count: number; // Numero di asset protetti dal WAF
    assets: string[]; // Nome del provider WAF
  };

  // Dettagli sul CDN (Content Delivery Network)
  cdn: {
    count: number
    assets: string[]
  };
}