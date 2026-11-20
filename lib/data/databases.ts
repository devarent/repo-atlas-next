export type DbCategory =
  | "Relational & distributed SQL"
  | "Cloud & analytics"
  | "NoSQL & search"
  | "Vector & graph"
  | "Streaming & time-series";

export type DatabaseTech = {
  name: string;
  category: DbCategory;
  glyph: string;
  color: string;
  tagline: string;
  use: string;
  image: string;
  url: string;
  lab: string | null;
};

export const dbCategories: DbCategory[] = [
  "Relational & distributed SQL",
  "Cloud & analytics",
  "NoSQL & search",
  "Vector & graph",
  "Streaming & time-series",
];

/** 26 teknologi data dari permintaan — lengkap, tanpa ada yang terlewat. */
export const databases: DatabaseTech[] = [
  // ── Relational & distributed SQL (7) ──────────────────────────────────
  { name: "Firebird", category: "Relational & distributed SQL", glyph: "🔥", color: "#f97316", tagline: "RDBMS ringan, embedded atau server.", use: "Legacy ERP, aplikasi desktop, dan deployment kecil.", image: "jacobalberty/firebird", url: "https://www.firebirdsql.org", lab: "firebird-lab" },
  { name: "IBM Db2", category: "Relational & distributed SQL", glyph: "💾", color: "#3b82f6", tagline: "RDBMS enterprise dengan LUW & z/OS.", use: "Core banking, transaksi volume tinggi.", image: "ibmcom/db2", url: "https://www.ibm.com/products/db2", lab: "ibm-db2-lab" },
  { name: "MariaDB", category: "Relational & distributed SQL", glyph: "🦭", color: "#00a2c7", tagline: "Fork MySQL yang open source & cepat.", use: "Aplikasi web, HRIS, migrasi MySQL.", image: "mariadb", url: "https://mariadb.org", lab: "mariadb-practicum" },
  { name: "SQL Server", category: "Relational & distributed SQL", glyph: "🟥", color: "#ef4444", tagline: "RDBMS Microsoft dengan T-SQL.", use: "Enterprise Windows, BI, reporting.", image: "mcr.microsoft.com/mssql/server", url: "https://www.microsoft.com/sql-server", lab: "sql-server-lab" },
  { name: "CockroachDB", category: "Relational & distributed SQL", glyph: "🪳", color: "#c084fc", tagline: "SQL distributed, toleran gangguan.", use: "Multi-region, persistensi global.", image: "cockroachdb/cockroach", url: "https://www.cockroachlabs.com", lab: "cockroachdb-lab" },
  { name: "InterSystems IRIS", category: "Relational & distributed SQL", glyph: "🌐", color: "#14b8a6", tagline: "Database multi-model untuk healthcare.", use: "Interoperabilitas, HL7/FHIR, analytics.", image: "intersystems/iris-community", url: "https://www.intersystems.com/products/intersystems-iris/", lab: "intersystems-iris-lab" },
  { name: "JDBC", category: "Relational & distributed SQL", glyph: "☕", color: "#facc15", tagline: "API Java untuk mengakses SQL.", use: "Koneksi standar Java ke semua RDBMS.", image: "eclipse-temurin", url: "https://docs.oracle.com/javase/tutorial/jdbc/", lab: "jdbc-lab" },

  // ── Cloud & analytics (8) ─────────────────────────────────────────────
  { name: "Databricks SQL", category: "Cloud & analytics", glyph: "🧱", color: "#ff3621", tagline: "Lakehouse SQL di atas Delta Lake.", use: "Analytics skala besar, ML, unity catalog.", image: "databricks", url: "https://docs.databricks.com/sql/index.html", lab: "databricks-sql-lab" },
  { name: "Snowflake", category: "Cloud & analytics", glyph: "❄️", color: "#29b5e8", tagline: "Cloud data warehouse dengan separation storage/compute.", use: "Data warehousing, sharing, ELT.", image: "snowflake", url: "https://docs.snowflake.com", lab: "snowflake-lab" },
  { name: "Redshift", category: "Cloud & analytics", glyph: "📉", color: "#8b5cf6", tagline: "Data warehouse AWS berbasis columnar.", use: "Analytics petabyte di AWS.", image: "amazon/redshift", url: "https://aws.amazon.com/redshift/", lab: null },
  { name: "BigQuery", category: "Cloud & analytics", glyph: "🔎", color: "#4285f4", tagline: "Serverless data warehouse Google.", use: "Ad-hoc analytics, BigQuery ML, GIS.", image: "google/bigquery", url: "https://cloud.google.com/bigquery/docs", lab: null },
  { name: "Teradata", category: "Cloud & analytics", glyph: "🗄️", color: "#f43f5e", tagline: "Analitik enterprise skala masif.", use: "Data warehouse korporat & Retail.", image: "teradata", url: "https://docs.teradata.com", lab: null },
  { name: "Vertica", category: "Cloud & analytics", glyph: "📐", color: "#0ea5e9", tagline: "Columnar DB untuk analytics tinggi.", use: "Query cepat pada data masif.", image: "vertica/vertica-ce", url: "https://www.vertica.com/docs/", lab: null },
  { name: "Databend", category: "Cloud & analytics", glyph: "🌀", color: "#22d3ee", tagline: "Data warehouse open source, elastic.", use: "Lakehouse modern, biaya rendah.", image: "datafuselabs/databend", url: "https://databend.rs/doc", lab: null },
  { name: "Apache Kylin", category: "Cloud & analytics", glyph: "🐉", color: "#34d399", tagline: "OLAP cubing untuk Hadoop/Spark.", use: "Analitik multidimensional skala besar.", image: "apachekylin/apache-kylin-standalone", url: "https://kylin.apache.org", lab: null },

  // ── NoSQL & search (4) ────────────────────────────────────────────────
  { name: "Redis", category: "NoSQL & search", glyph: "⚡", color: "#dc382d", tagline: "In-memory store: cache, queue, session.", use: "Caching, rate limit, pub/sub, Streams.", image: "redis", url: "https://redis.io/docs", lab: "redis-lab" },
  { name: "MongoDB", category: "NoSQL & search", glyph: "🍃", color: "#47a248", tagline: "Document database fleksibel.", use: "CRUD cepat, aggregation pipeline.", image: "mongo", url: "https://www.mongodb.com/docs", lab: "mongodb-practicum" },
  { name: "Cassandra", category: "NoSQL & search", glyph: "🌋", color: "#1287b1", tagline: "Wide-column, masterless, always-on.", use: "Write tinggi, multi-DC, time-series.", image: "cassandra", url: "https://cassandra.apache.org/doc/latest/", lab: null },
  { name: "Elasticsearch", category: "NoSQL & search", glyph: "🔍", color: "#fec514", tagline: "Search engine & log analytics.", use: "Full-text search, observability (ELK).", image: "elasticsearch", url: "https://www.elastic.co/docs", lab: null },

  // ── Vector & graph (3) ────────────────────────────────────────────────
  { name: "Qdrant", category: "Vector & graph", glyph: "🧭", color: "#dc244c", tagline: "Vector database untuk RAG & similarity.", use: "Embedding search, semantic retrieval.", image: "qdrant/qdrant", url: "https://qdrant.tech/documentation/", lab: "qdrant-lab" },
  { name: "ChromaDB", category: "Vector & graph", glyph: "🧬", color: "#a855f7", tagline: "Vector store ramah pengembangan AI.", use: "Prototipe LLM, document QA.", image: "chromadb/chroma", url: "https://docs.trychroma.com", lab: null },
  { name: "Neo4j", category: "Vector & graph", glyph: "🕸️", color: "#018bff", tagline: "Graph database native dengan Cypher.", use: "Relasi kompleks, knowledge graph, fraud.", image: "neo4j", url: "https://neo4j.com/docs/", lab: null },

  // ── Streaming & time-series (4) ───────────────────────────────────────
  { name: "Kafka", category: "Streaming & time-series", glyph: "🌊", color: "#231f20", tagline: "Event streaming platform distributed.", use: "Event-driven microservices, replay.", image: "apache/kafka", url: "https://kafka.apache.org/documentation/", lab: null },
  { name: "VictoriaMetrics", category: "Streaming & time-series", glyph: "📊", color: "#f2a900", tagline: "Time-series DB cepat & hemat RAM.", use: "Metrics Prometheus jangka panjang.", image: "victoriametrics/victoria-metrics", url: "https://docs.victoriametrics.com", lab: null },
  { name: "InfluxDB", category: "Streaming & time-series", glyph: "🟦", color: "#22adf6", tagline: "Time-series DB untuk IoT & metrik.", use: "Telemetri, monitoring, Flux query.", image: "influxdb", url: "https://docs.influxdata.com", lab: null },
  { name: "TDengine", category: "Streaming & time-series", glyph: "⏱️", color: "#1e9fff", tagline: "Time-series DB untuk IoT berskala besar.", use: "Sensor, telemetri, high ingest.", image: "tdengine/tdengine", url: "https://docs.tdengine.com", lab: null },
];
