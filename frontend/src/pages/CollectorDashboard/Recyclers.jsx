import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import {
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  LocateFixed,
  MapPin,
  Navigation,
  PackageCheck,
  Recycle,
  Search,
  SlidersHorizontal,
  Truck,
} from "lucide-react";

import { motion, } from "framer-motion";
import { divIcon, } from "leaflet";
import { useNavigate, } from "react-router-dom";
import useTranslation from "../../i18n/useTranslation";
import useRegionStore from "../../store/regionStore";
import { getAllRecyclers, } from "../../services/recyclers/recyclerStore";
import {
  getCityFallbackCenter,
  getDistanceKm,
} from "../../utils/recyclerUtils";
import "leaflet/dist/leaflet.css";

const RADIUS_OPTIONS = [
  5,
  10,
  25,
  50,
];

const MATERIAL_OPTIONS = [
  "all",
  "mobile",
  "laptop",
  "computer",
  "pcb",
  "cables",
  "battery",
  "monitor",
  "printer",
];

const PAYMENT_OPTIONS = [
  "all",
  "upi",
  "bank",
  "cash",
];

/* ============================================================
   CUSTOM COLLECTOR MARKER
============================================================ */

const collectorIcon = divIcon({
  className: "",
  html: `
    <div
      style="
        width: 22px;
        height: 22px;
        border-radius: 9999px;
        background: #ffffff;
        border: 3px solid #123F2D;
        box-shadow: 0 0 0 5px rgba(53,168,115,0.22),
                    0 5px 16px rgba(18,63,45,0.28);
        display:flex;
        align-items:center;
        justify-content:center;
      "
    >
      <div
        style="
          width: 9px;
          height: 9px;
          border-radius: 9999px;
          background:#35A873;
        "
      ></div>
    </div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -12],
});

/* ============================================================
   MAP VIEW
============================================================ */

const MapViewUpdater = ({
  center,
}) => {
  const map = useMap();

  useEffect(() => {
    if (
      center?.lat == null ||
      center?.lng == null
    ) {
      return;
    }

    map.setView(
      [center.lat, center.lng],
      map.getZoom(),
      {
        animate: true,
      }
    );
  }, [center, map]);

  return null;
};

/* ============================================================
   PAGE
============================================================ */

const Recyclers = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const city = useRegionStore(
    (state) => state.city
  );

  const state = useRegionStore(
    (state) => state.state
  );

  const [
    recyclers,
    setRecyclers,
  ] = useState(() =>
    getAllRecyclers()
  );

  const [
    collectorLocation,
    setCollectorLocation,
  ] = useState(null);

  const [
    collectorAccuracy,
    setCollectorAccuracy,
  ] = useState(null);

  const [
    locationLoading,
    setLocationLoading,
  ] = useState(true);

  const [
    locationExact,
    setLocationExact,
  ] = useState(false);

  const [
    radius,
    setRadius,
  ] = useState(10);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    material,
    setMaterial,
  ] = useState("all");

  const [
    payment,
    setPayment,
  ] = useState("all");

  const [
    pickupOnly,
    setPickupOnly,
  ] = useState(false);

  const [
    doorstepOnly,
    setDoorstepOnly,
  ] = useState(false);

  const [
    verifiedOnly,
    setVerifiedOnly,
  ] = useState(false);

  const [
    sortBy,
    setSortBy,
  ] = useState("distance");

  const [
    filtersOpen,
    setFiltersOpen,
  ] = useState(false);

  const [
    mobileView,
    setMobileView,
  ] = useState("map");

  const [
  selectedRecyclerId,
  setSelectedRecyclerId,
] = useState(null);

  /* ==========================================================
     REFRESH RECYCLERS
  ========================================================== */

  useEffect(() => {
    const refresh = () => {
      setRecyclers(
        getAllRecyclers()
      );
    };

    window.addEventListener(
      "storage",
      refresh
    );

    window.addEventListener(
      "kabadiwala:recycler-updated",
      refresh
    );

    return () => {
      window.removeEventListener(
        "storage",
        refresh
      );

      window.removeEventListener(
        "kabadiwala:recycler-updated",
        refresh
      );
    };
  }, []);

  /* ==========================================================
     GET REAL DEVICE LOCATION
  ========================================================== */

  const requestCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationLoading(false);
      setLocationExact(false);
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCollectorLocation({
          lat:
            position.coords.latitude,
          lng:
            position.coords.longitude,
        });

        setCollectorAccuracy(
          position.coords.accuracy
        );

        setLocationExact(true);
        setLocationLoading(false);
      },
      () => {
        setLocationLoading(false);
        setLocationExact(false);

        const fallback =
          getCityFallbackCenter(
            recyclers,
            city
          );

        setCollectorLocation(
          fallback
        );

        setCollectorAccuracy(
          null
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 2 * 60 * 1000,
      }
    );
  };

  useEffect(() => {
    requestCurrentLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  /* ==========================================================
     ENRICH RECYCLERS WITH DISTANCE
  ========================================================== */

  const enrichedRecyclers =
    useMemo(() => {
      if (!collectorLocation) {
        return [];
      }

      return recyclers.map(
        (recycler) => ({
          ...recycler,

          distance:
            getDistanceKm(
              collectorLocation,
              recycler
                .location
                .coordinates
            ),
        })
      );
    }, [
      recyclers,
      collectorLocation,
    ]);

  /* ==========================================================
     FILTER
  ========================================================== */

  const filteredRecyclers =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      const filtered =
        enrichedRecyclers.filter(
          (recycler) => {
            if (
              recycler.distance >
              radius
            ) {
              return false;
            }

            if (
              normalizedSearch
            ) {
              const searchable = [
                recycler.name,
                recycler.location?.city,
                recycler.location?.state,
                recycler.location?.address,
              ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

              if (
                !searchable.includes(
                  normalizedSearch
                )
              ) {
                return false;
              }
            }

            if (
              material !==
                "all" &&
              !recycler.acceptedMaterials.includes(
                material
              )
            ) {
              return false;
            }

            if (
              payment !==
                "all" &&
              !recycler.paymentMethods.includes(
                payment
              )
            ) {
              return false;
            }

            if (
              pickupOnly &&
              !recycler.pickup
                ?.available
            ) {
              return false;
            }

            if (
              doorstepOnly &&
              !recycler.pickup
                ?.doorstep
            ) {
              return false;
            }

            if (
              verifiedOnly &&
              !recycler.verified
            ) {
              return false;
            }

            return true;
          }
        );

      return [...filtered].sort(
        (a, b) => {
          if (
            sortBy ===
            "pickup"
          ) {
            return (
              Number(
                b.pickup?.available
              ) -
              Number(
                a.pickup?.available
              )
            );
          }

          if (
            sortBy ===
            "verified"
          ) {
            return (
              Number(
                b.verified
              ) -
              Number(
                a.verified
              )
            );
          }

          return (
            a.distance -
            b.distance
          );
        }
      );
    }, [
      enrichedRecyclers,
      radius,
      search,
      material,
      payment,
      pickupOnly,
      doorstepOnly,
      verifiedOnly,
      sortBy,
    ]);

  const mapCenter =
    collectorLocation || {
      lat: 20.5937,
      lng: 78.9629,
    };

  const activeFiltersCount =
    Number(pickupOnly) +
    Number(doorstepOnly) +
    Number(verifiedOnly) +
    Number(
      material !== "all"
    ) +
    Number(
      payment !== "all"
    );

  /* ==========================================================
     MAP LOCATION STATE
  ========================================================== */

  const locationMessage =
    locationExact
      ? t(
          "recyclers.exactLocation"
        )
      : t(
          "recyclers.approximateLocation"
        );

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="w-full">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-5 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">

        <div className="min-w-0">

          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--primary)]/15 bg-[var(--accent)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--primary)]">
            <Recycle
              size={13}
              strokeWidth={2.4}
            />

            {t(
              "recyclers.badge"
            )}
          </div>

          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
            {t(
              "recyclers.title"
            )}
          </h1>

          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            {t(
              "recyclers.subtitle"
            )}
          </p>

          {city && (
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)]">
              <MapPin
                size={13}
                className="text-[var(--primary)]"
              />

              <span>
                {city}
                {state
                  ? `, ${state}`
                  : ""}
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={
            requestCurrentLocation
          }
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-xs font-bold text-[var(--foreground)] shadow-[0_7px_22px_rgba(18,63,45,0.05)] transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:shadow-[0_10px_28px_rgba(18,63,45,0.08)] active:scale-[0.98]"
        >
          <LocateFixed
            size={15}
            className="text-[var(--primary)]"
          />

          {locationLoading
            ? t(
                "recyclers.detectingLocation"
              )
            : t(
                "recyclers.useMyLocation"
              )}
        </button>
      </div>

      {/* =====================================================
          LOCATION STATUS
      ===================================================== */}

      <div
        className={`mb-4 flex items-center gap-2 rounded-xl border px-3 py-2.5 ${
          locationExact
            ? "border-[#35A873]/20 bg-[#E3F2E9]/60"
            : "border-[#E6A43B]/20 bg-[#FFF3D9]/70"
        }`}
      >
        <div
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
            locationExact
              ? "bg-[#35A873]"
              : "bg-[#E6A43B]"
          }`}
        />

        <p
          className={`text-[10px] font-bold ${
            locationExact
              ? "!text-[#123F2D]"
              : "!text-[#5F430F]"
          }`}
        >
          {locationMessage}
        </p>
      </div>

      {/* =====================================================
          SEARCH + RADIUS
      ===================================================== */}

      <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-[0_10px_35px_rgba(18,63,45,0.045)] sm:p-4">

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

          {/* SEARCH */}

          <div className="relative min-w-0 flex-1">

            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder={t(
                "recyclers.searchPlaceholder"
              )}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-3 pl-10 pr-4 text-sm font-medium text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--muted)] focus:border-[var(--primary)]/40 focus:ring-4 focus:ring-[var(--primary)]/10"
            />
          </div>

          {/* RADIUS */}

          <div className="shrink-0">

            <p className="mb-2 text-[9px] font-black uppercase tracking-[0.13em] text-[var(--muted)]">
              {t(
                "recyclers.searchRadius"
              )}
            </p>

            <div className="flex gap-1.5 overflow-x-auto pb-0.5">

              {RADIUS_OPTIONS.map(
                (option) => {
                  const active =
                    radius ===
                    option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setRadius(
                          option
                        )
                      }
                      className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-black transition-all ${
                        active
                          ? "bg-[#123F2D] !text-white shadow-[0_6px_16px_rgba(18,63,45,0.18)]"
                          : "border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--primary)]/30"
                      }`}
                    >
                      {option} km
                    </button>
                  );
                }
              )}

            </div>
          </div>

          {/* FILTER */}

          <button
            type="button"
            onClick={() =>
              setFiltersOpen(
                (current) =>
                  !current
              )
            }
            className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-black transition-all ${
              filtersOpen ||
              activeFiltersCount >
                0
                ? "border-[var(--primary)]/25 bg-[var(--accent)] text-[var(--primary)]"
                : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
            }`}
          >
            <SlidersHorizontal
              size={15}
            />

            {t(
              "recyclers.filters"
            )}

            {activeFiltersCount >
              0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1.5 text-[9px] font-black text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* =================================================
            FILTER PANEL
        ================================================= */}

        {filtersOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            className="mt-3 overflow-hidden border-t border-[var(--border)] pt-3.5"
          >

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

              {/* MATERIAL */}

              <div>

                <label className="mb-1.5 block text-[9px] font-black uppercase tracking-[0.12em] text-[var(--muted)]">
                  {t(
                    "recyclers.material"
                  )}
                </label>

                <div className="relative">

                  <select
                    value={material}
                    onChange={(event) =>
                      setMaterial(
                        event.target
                          .value
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 pr-9 text-xs font-bold text-[var(--foreground)] outline-none"
                  >
                    {MATERIAL_OPTIONS.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {t(
                            `recyclers.materials.${item}`
                          )}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  />

                </div>
              </div>

              {/* PAYMENT */}

              <div>

                <label className="mb-1.5 block text-[9px] font-black uppercase tracking-[0.12em] text-[var(--muted)]">
                  {t(
                    "recyclers.payment"
                  )}
                </label>

                <div className="relative">

                  <select
                    value={payment}
                    onChange={(event) =>
                      setPayment(
                        event.target
                          .value
                      )
                    }
                    className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 pr-9 text-xs font-bold text-[var(--foreground)] outline-none"
                  >
                    {PAYMENT_OPTIONS.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {t(
                            `recyclers.payments.${item}`
                          )}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                  />

                </div>
              </div>

              {/* TOGGLES */}

              <div className="grid grid-cols-3 gap-2 sm:col-span-2">

                <FilterToggle
                  active={
                    pickupOnly
                  }
                  onClick={() =>
                    setPickupOnly(
                      (current) =>
                        !current
                    )
                  }
                  icon={Truck}
                  label={t(
                    "recyclers.pickup"
                  )}
                />

                <FilterToggle
                  active={
                    doorstepOnly
                  }
                  onClick={() =>
                    setDoorstepOnly(
                      (current) =>
                        !current
                    )
                  }
                  icon={Navigation}
                  label={t(
                    "recyclers.doorstep"
                  )}
                />

                <FilterToggle
                  active={
                    verifiedOnly
                  }
                  onClick={() =>
                    setVerifiedOnly(
                      (current) =>
                        !current
                    )
                  }
                  icon={
                    CheckCircle2
                  }
                  label={t(
                    "recyclers.verified"
                  )}
                />

              </div>
            </div>

            {/* SORT */}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">

              <button
                type="button"
                onClick={() => {
                  setMaterial(
                    "all"
                  );
                  setPayment(
                    "all"
                  );
                  setPickupOnly(
                    false
                  );
                  setDoorstepOnly(
                    false
                  );
                  setVerifiedOnly(
                    false
                  );
                }}
                className="text-[10px] font-black text-[var(--muted)] hover:text-[var(--primary)]"
              >
                {t(
                  "recyclers.clearFilters"
                )}
              </button>

              <div className="flex items-center gap-2">

                <span className="text-[9px] font-black uppercase tracking-[0.12em] text-[var(--muted)]">
                  {t(
                    "recyclers.sort"
                  )}
                </span>

                {[
                  "distance",
                  "pickup",
                  "verified",
                ].map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setSortBy(
                          option
                        )
                      }
                      className={`rounded-lg px-2.5 py-1.5 text-[9px] font-black ${
                        sortBy ===
                        option
                          ? "bg-[var(--accent)] text-[var(--primary)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      {t(
                        `recyclers.sortOptions.${option}`
                      )}
                    </button>
                  )
                )}

              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* =====================================================
          RESULT HEADER
      ===================================================== */}

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

        <div>
          <p className="text-sm font-black text-[var(--foreground)]">
            {filteredRecyclers.length}{" "}
            {t(
              "recyclers.recyclersFound"
            )}
          </p>

          <p className="mt-0.5 text-[10px] font-semibold text-[var(--muted)]">
            {t(
              "recyclers.within"
            )}{" "}
            {radius} km
          </p>
        </div>

        <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 lg:hidden">

          <button
            type="button"
            onClick={() =>
              setMobileView(
                "map"
              )
            }
            className={`rounded-lg px-3 py-1.5 text-[10px] font-black ${
              mobileView ===
              "map"
                ? "bg-[var(--accent)] text-[var(--primary)]"
                : "text-[var(--muted)]"
            }`}
          >
            {t(
              "recyclers.map"
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setMobileView(
                "list"
              )
            }
            className={`rounded-lg px-3 py-1.5 text-[10px] font-black ${
              mobileView ===
              "list"
                ? "bg-[var(--accent)] text-[var(--primary)]"
                : "text-[var(--muted)]"
            }`}
          >
            {t(
              "recyclers.list"
            )}
          </button>

        </div>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">

        {/* ===================================================
            MAP
        =================================================== */}

        <section
          className={`overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_16px_45px_rgba(18,63,45,0.07)] ${
            mobileView === "list"
              ? "hidden lg:block"
              : "block"
          }`}
        >

          <div className="relative h-[390px] overflow-hidden rounded-[22px] sm:h-[460px] lg:h-[560px]">

            <MapContainer
              center={[
                mapCenter.lat,
                mapCenter.lng,
              ]}
              zoom={10}
              scrollWheelZoom
              className="h-full w-full"
            >

              <MapViewUpdater
                center={
                  collectorLocation
                }
              />

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* RADIUS */}

              <Circle
                center={[
                  mapCenter.lat,
                  mapCenter.lng,
                ]}
                radius={
                  radius * 1000
                }
                pathOptions={{
                  color:
                    "#35A873",
                  fillColor:
                    "#35A873",
                  fillOpacity:
                    0.07,
                  weight: 2,
                }}
              />

              {/* ACCURACY */}

              {locationExact &&
                collectorAccuracy && (
                  <Circle
                    center={[
                      mapCenter.lat,
                      mapCenter.lng,
                    ]}
                    radius={
                      collectorAccuracy
                    }
                    pathOptions={{
                      color:
                        "#35A873",
                      fillColor:
                        "#35A873",
                      fillOpacity:
                        0.08,
                      weight: 1,
                      dashArray:
                        "4 4",
                    }}
                  />
                )}

              {/* COLLECTOR */}

              <Marker
                position={[
                  mapCenter.lat,
                  mapCenter.lng,
                ]}
                icon={
                  collectorIcon
                }
              >
                <Popup>
                  <div className="min-w-[170px]">

                    <p className="text-sm font-black">
                      {locationExact
                        ? t(
                            "recyclers.yourLocation"
                          )
                        : t(
                            "recyclers.approximateArea"
                          )}
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      {locationExact
                        ? t(
                            "recyclers.locationDetected"
                          )
                        : t(
                            "recyclers.locationFallback"
                          )}
                    </p>

                  </div>
                </Popup>
              </Marker>

              {/* RECYCLERS */}

              {filteredRecyclers.map(
                (recycler) => {
                  const selected =
                    recycler.id ===
                    selectedRecyclerId;

                  return (
                    <CircleMarker
                      key={
                        recycler.id
                      }
                      center={[
                        recycler
                          .location
                          .coordinates
                          .lat,
                        recycler
                          .location
                          .coordinates
                          .lng,
                      ]}
                      radius={
                        selected
                          ? 10
                          : 7
                      }
                      eventHandlers={{
                        click: () =>
                          navigate(
                            `/collector/recyclers/${recycler.id}`
                          ),
                      }}
                      pathOptions={{
                        color:
                          recycler.verified
                            ? "#123F2D"
                            : "#E6A43B",
                        fillColor:
                          recycler.verified
                            ? "#35A873"
                            : "#E6A43B",
                        fillOpacity:
                          1,
                        weight:
                          selected
                            ? 4
                            : 2,
                      }}
                    >

                      <Popup>

                        <div className="min-w-[200px]">

                          <p className="text-sm font-black">
                            {
                              recycler.name
                            }
                          </p>

                          <p className="mt-1 text-xs text-gray-600">
                            {
                              recycler
                                .location
                                .city
                            }
                            {" · "}
                            {recycler.distance.toFixed(
                              1
                            )}{" "}
                            km
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/collector/recyclers/${recycler.id}`
                              )
                            }
                            className="mt-3 rounded-lg bg-[#123F2D] px-3 py-2 text-[10px] font-black text-white"
                          >
                            {t(
                              "recyclers.viewDetails"
                            )}
                          </button>

                        </div>

                      </Popup>
                    </CircleMarker>
                  );
                }
              )}

            </MapContainer>

            {/* MAP LABEL */}

            <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-xl border border-white/60 bg-white/85 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#35A873] ring-4 ring-[#35A873]/15" />

                <span className="text-[10px] font-black text-[#123F2D]">
                  {radius} km{" "}
                  {t(
                    "recyclers.radius"
                  )}
                </span>
              </div>
            </div>

            {/* LEGEND */}

            <div className="absolute bottom-3 left-3 z-[500] flex flex-wrap items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#35A873] ring-2 ring-[#123F2D]" />
                <span className="text-[8px] font-black text-[#123F2D]">
                  {t(
                    "recyclers.verified"
                  )}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E6A43B] ring-2 ring-[#E6A43B]" />
                <span className="text-[8px] font-black text-[#5F430F]">
                  {t(
                    "recyclers.pending"
                  )}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-[#123F2D] bg-[#35A873]" />
                <span className="text-[8px] font-black text-[#123F2D]">
                  {t(
                    "recyclers.you"
                  )}
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* ===================================================
            LIST
        =================================================== */}

        <section
          className={`min-w-0 ${
            mobileView === "map"
              ? "hidden lg:block"
              : "block"
          }`}
        >

          <div className="space-y-3 lg:max-h-[560px] lg:overflow-y-auto lg:pr-1">

            {filteredRecyclers.length ===
            0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-6 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--primary)]">
                  <Recycle
                    size={26}
                  />
                </div>

                <h3 className="mt-4 text-base font-black">
                  {t(
                    "recyclers.noResultsTitle"
                  )}
                </h3>

                <p className="mt-1.5 max-w-sm text-xs leading-5 text-[var(--muted)]">
                  {t(
                    "recyclers.noResultsDescription"
                  )}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setRadius(
                      25
                    );

                    setMaterial(
                      "all"
                    );

                    setPayment(
                      "all"
                    );

                    setPickupOnly(
                      false
                    );

                    setDoorstepOnly(
                      false
                    );

                    setVerifiedOnly(
                      false
                    );
                  }}
                  className="mt-4 rounded-xl bg-[#123F2D] px-4 py-2.5 text-xs font-black text-white"
                >
                  {t(
                    "recyclers.showMore"
                  )}
                </button>

              </div>
            ) : (
              filteredRecyclers.map(
                (
                  recycler,
                  index
                ) => (
                  <RecyclerCard
                    key={
                      recycler.id
                    }
                    recycler={
                      recycler
                    }
                    index={
                      index
                    }
                    t={t}
                    navigate={
                      navigate
                    }
                  />
                )
              )
            )}

          </div>
        </section>
      </div>
    </div>
  );
};

/* ============================================================
   FILTER TOGGLE
============================================================ */

const FilterToggle = ({
  active,
  onClick,
  icon: Icon,
  label,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex min-h-[58px] items-center justify-center gap-2 rounded-xl border px-2.5 text-[10px] font-black transition-all ${
      active
        ? "border-[var(--primary)]/25 bg-[var(--accent)] text-[var(--primary)]"
        : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)]"
    }`}
  >
    <Icon size={14} />

    <span className="truncate">
      {label}
    </span>
  </button>
);

/* ============================================================
   RECYCLER CARD
============================================================ */

const RecyclerCard = ({
  recycler,
  index,
  t,
  navigate,
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: 10,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 0.28,
      delay:
        index * 0.035,
    }}
    className="group w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-[0_7px_24px_rgba(18,63,45,0.045)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)]/20 hover:shadow-[0_12px_30px_rgba(18,63,45,0.075)]"
  >

    {/* TOP */}

    <div className="flex items-start gap-3">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E3F2E9] to-[#B8DFC8] text-[#123F2D]">
        <Recycle
          size={21}
        />
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex flex-wrap items-center gap-1.5">

          <h3 className="truncate text-sm font-black text-[var(--foreground)]">
            {
              recycler.name
            }
          </h3>

          {recycler.verified ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#E3F2E9] px-2 py-1 text-[8px] font-black text-[#123F2D]">
              <CheckCircle2
                size={10}
              />
              {t(
                "recyclers.verified"
              )}
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#FFF3D9] px-2 py-1 text-[8px] font-black text-[#5F430F]">
              {t(
                "recyclers.pending"
              )}
            </span>
          )}

        </div>

        <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-[var(--muted)]">

          <MapPin
            size={11}
          />

          <span className="truncate">
            {
              recycler
                .location
                .city
            }
          </span>

          <span>
            ·
          </span>

          <span>
            {recycler.distance.toFixed(
              1
            )}{" "}
            {t(
              "recyclers.kmAway"
            )}
          </span>

        </div>
      </div>
    </div>

    {/* BENEFITS */}

    <div className="mt-3 flex flex-wrap gap-1.5">

      {recycler.pickup
        ?.available && (
        <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--background)] px-2 py-1.5 text-[8px] font-black text-[var(--primary)]">
          <Truck
            size={10}
          />

          {t(
            "recyclers.pickup"
          )}
        </span>
      )}

      {recycler.pickup
        ?.doorstep && (
        <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--background)] px-2 py-1.5 text-[8px] font-black text-[var(--primary)]">
          <Navigation
            size={10}
          />

          {t(
            "recyclers.doorstep"
          )}
        </span>
      )}

      <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--background)] px-2 py-1.5 text-[8px] font-black text-[var(--muted)]">
        <PackageCheck
          size={10}
        />

        {
          recycler.minimumPickupWeight
        }{" "}
        kg+
      </span>
    </div>

    {/* MATERIALS */}

    <div className="mt-3">

      <p className="mb-1.5 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--muted)]">
        {t(
          "recyclers.acceptedMaterials"
        )}
      </p>

      <div className="flex flex-wrap gap-1.5">

        {recycler.acceptedMaterials
          .slice(0, 5)
          .map((item) => (
            <span
              key={item}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[8px] font-bold text-[var(--muted)]"
            >
              {t(
                `recyclers.materials.${item}`
              )}
            </span>
          ))}

      </div>
    </div>

    {/* BOTTOM */}

    <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3">

      <div className="flex min-w-0 items-center gap-1.5">

        <CircleDollarSign
          size={12}
          className="shrink-0 text-[var(--primary)]"
        />

        <span className="truncate text-[9px] font-bold text-[var(--muted)]">
          {recycler.paymentMethods
            .map((method) =>
              t(
                `recyclers.payments.${method}`
              )
            )
            .join(" · ")}
        </span>

      </div>

      <button
        type="button"
        onClick={() =>
          navigate(
            `/collector/recyclers/${recycler.id}`
          )
        }
        className="shrink-0 rounded-lg bg-[#123F2D] px-3 py-1.5 text-[9px] font-black text-white transition hover:bg-[#18794E] active:scale-[0.98]"
      >
        {t(
          "recyclers.viewDetails"
        )}
      </button>

    </div>
  </motion.div>
);

export default Recyclers;