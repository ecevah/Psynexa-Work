import React from "react";
import styles from "./footer.module.css";

export default function Copyright() {
  return (
    <p className="text-[17px] leading-[26px] text-center py-[23px]">
      Copyright | <span className={styles.footerCopyrightBlue}>Psynexa</span>{" "}
      all rights protected 2024
    </p>
  );
}
